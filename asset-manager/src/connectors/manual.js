const BaseConnector = require('./base');

class ManualConnector extends BaseConnector {
  constructor() {
    super('manual');
  }

  async sync(jobId) {
    return { status: 'skipped', added: 0, updated: 0, details: { note: 'Manual source — assets are added via API or UI' } };
  }
}

module.exports = ManualConnector;
