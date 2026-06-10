const { Client } = require('@microsoft/microsoft-graph-client');
const { ClientSecretCredential } = require('@azure/identity');
const config = require('../config');
const BaseConnector = require('./base');

class PowerAutomateConnector extends BaseConnector {
  constructor() {
    super('powerautomate');
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
      const flowTypeId = this.getAssetTypeId('Flow');

      // Fetch Power Automate flows
      let flows = await client.api('/servicePrincipals?$filter=tags/any(t:t eq \'Microsoft.Flow\')&$select=id,displayName,description,createdDateTime,appOwnerOrganizationId,tags&$top=999').get();

      // Also try the Power Platform API endpoint for flows
      for (const f of flows.value || []) {
        const result = this.upsertAsset({
          externalId: f.id, name: f.displayName, description: f.description,
          assetTypeId: flowTypeId, category: 'Power Automate', status: 'active',
          lastSeen: new Date().toISOString().split('T')[0],
          metadata: { created: f.createdDateTime, type: 'service principal' },
        });
        if (result.action === 'added') added++;
        else updated++;
      }

      // Try to get flows via the Power Platform API
      try {
        let ppFlows = await client.api('/users?$select=id,displayName,userPrincipalName&$top=50').get();
        // For each user, we'd need to call the Power Automate management API
        // This requires additional scopes: https://management.azure.com/.default
      } catch (_) {}

      this.logSync(jobId, startedAt, { status: 'completed', added, updated, details: { servicePrincipals: flows.value?.length || 0 } });
      return { status: 'completed', added, updated };
    } catch (err) {
      this.logSync(jobId, startedAt, { status: 'failed', added: 0, updated: 0, error: err.message });
      return { status: 'failed', error: err.message };
    }
  }
}

module.exports = PowerAutomateConnector;
