const { Client } = require('@microsoft/microsoft-graph-client');
const { ClientSecretCredential } = require('@azure/identity');
const config = require('../config');
const BaseConnector = require('./base');

class EntraConnector extends BaseConnector {
  constructor() {
    super('entra');
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
      const teamTypeId = this.getAssetTypeId('Team');
      const appTypeId = this.getAssetTypeId('App Registration');
      const groupTypeId = this.getAssetTypeId('Group');
      const userTypeId = this.getAssetTypeId('User');

      // Fetch Microsoft 365 Groups (teams)
      let groups = await client.api('/groups?$select=id,displayName,description,createdDateTime,visibility&$top=999').get();
      for (const g of groups.value || []) {
        const result = this.upsertAsset({
          externalId: g.id, name: g.displayName, description: g.description,
          assetTypeId: g.visibility === 'Private' ? teamTypeId : groupTypeId,
          category: 'Microsoft 365', status: 'active',
          lastSeen: new Date().toISOString().split('T')[0],
          metadata: { visibility: g.visibility, created: g.createdDateTime },
        });
        if (result.action === 'added') added++;
        else updated++;
      }

      // Fetch applications (App Registrations / Enterprise Apps)
      let apps = await client.api('/applications?$select=id,displayName,description,createdDateTime,publisherDomain&$top=999').get();
      for (const a of apps.value || []) {
        const result = this.upsertAsset({
          externalId: a.id, name: a.displayName, description: a.description,
          assetTypeId: appTypeId, category: 'Enterprise App', status: 'active',
          lastSeen: new Date().toISOString().split('T')[0],
          metadata: { publisherDomain: a.publisherDomain, created: a.createdDateTime },
        });
        if (result.action === 'added') added++;
        else updated++;
      }

      this.logSync(jobId, startedAt, { status: 'completed', added, updated, details: { groups: groups.value?.length || 0, apps: apps.value?.length || 0 } });
      return { status: 'completed', added, updated };
    } catch (err) {
      this.logSync(jobId, startedAt, { status: 'failed', added: 0, updated: 0, error: err.message });
      return { status: 'failed', error: err.message };
    }
  }
}

module.exports = EntraConnector;
