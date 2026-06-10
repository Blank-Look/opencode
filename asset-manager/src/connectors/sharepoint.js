const { Client } = require('@microsoft/microsoft-graph-client');
const { ClientSecretCredential } = require('@azure/identity');
const config = require('../config');
const BaseConnector = require('./base');

class SharePointConnector extends BaseConnector {
  constructor() {
    super('sharepoint');
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
      const siteTypeId = this.getAssetTypeId('Site');
      const listTypeId = this.getAssetTypeId('List');

      let sites = await client.api('/sites?$select=id,displayName,description,webUrl,createdDateTime,lastModifiedDateTime&$top=999').get();
      for (const s of sites.value || []) {
        const result = this.upsertAsset({
          externalId: s.id, name: s.displayName, description: s.description,
          assetTypeId: siteTypeId, category: 'SharePoint Site', status: 'active',
          lastSeen: s.lastModifiedDateTime?.split('T')[0],
          metadata: { webUrl: s.webUrl, created: s.createdDateTime },
        });
        if (result.action === 'added') added++;
        else updated++;
      }

      this.logSync(jobId, startedAt, { status: 'completed', added, updated, details: { sites: sites.value?.length || 0 } });
      return { status: 'completed', added, updated };
    } catch (err) {
      this.logSync(jobId, startedAt, { status: 'failed', added: 0, updated: 0, error: err.message });
      return { status: 'failed', error: err.message };
    }
  }
}

module.exports = SharePointConnector;
