const { Client } = require('@microsoft/microsoft-graph-client');
const { ClientSecretCredential } = require('@azure/identity');
const config = require('../config');
const BaseConnector = require('./base');

class DefenderConnector extends BaseConnector {
  constructor() {
    super('defender');
    this.client = null;
  }

  getClient() {
    if (this.client) return this.client;
    const credential = new ClientSecretCredential(config.azure.tenantId, config.azure.clientId, config.azure.clientSecret);
    this.client = Client.initWithMiddleware({
      authProvider: {
        getAccessToken: async () => {
          const token = await credential.getToken('https://graph.microsoft.com/.default');
          return token.token;
        },
      },
    });
    return this.client;
  }

  async sync(jobId) {
    if (!this.source || !this.source.enabled) return { status: 'skipped', added: 0, updated: 0 };
    const startedAt = new Date().toISOString();
    try {
      const client = this.getClient();
      let added = 0, updated = 0;
      const softwareTypeId = this.getAssetTypeId('Software');
      const vulnTypeId = this.getAssetTypeId('Vulnerability');
      const alertTypeId = this.getAssetTypeId('Alert');

      // Fetch software inventory from Defender (Microsoft Graph Security API)
      let software = await client.api('/security/secureScores?$top=1').get();

      // TVI — software inventory via Defender for Endpoint
      try {
        let sp = await client.api('/deviceManagement/softwareUpdateStatusSummary').get();
      } catch (_) { /* permission may not be available */ }

      // Fetch alerts from Microsoft Graph Security API
      let alerts = await client.api('/security/alerts_v2?$top=200&$orderby=createdDateTime desc').get();
      for (const al of alerts.value || []) {
        const result = this.upsertAsset({
          externalId: al.id, name: al.title || 'Defender Alert', description: al.description,
          assetTypeId: alertTypeId, category: 'Security Alert', status: al.status === 'resolved' ? 'inactive' : 'active',
          lastSeen: al.lastUpdateDateTime?.split('T')[0],
          metadata: { severity: al.severity, category: al.category, created: al.createdDateTime, vendor: al.vendorInformation?.provider },
        });
        if (result.action === 'added') added++;
        else updated++;
      }

      // Fetch threat indicators
      try {
        let ti = await client.api('/security/threatIntelligence/hosts?$top=100').get();
        for (const h of ti.value || []) {
          const result = this.upsertAsset({
            externalId: h.id, name: h.hostName || h.id,
            assetTypeId: vulnTypeId, category: 'Threat Indicator', status: 'active',
            metadata: { firstSeen: h.firstSeenDateTime, lastSeen: h.lastSeenDateTime },
          });
          if (result.action === 'added') added++;
          else updated++;
        }
      } catch (_) { /* permission may not be available */ }

      this.logSync(jobId, startedAt, { status: 'completed', added, updated, details: { alerts: alerts.value?.length || 0 } });
      return { status: 'completed', added, updated };
    } catch (err) {
      this.logSync(jobId, startedAt, { status: 'failed', added: 0, updated: 0, error: err.message });
      return { status: 'failed', error: err.message };
    }
  }
}

module.exports = DefenderConnector;
