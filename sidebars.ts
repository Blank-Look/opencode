import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Governance',
      items: [
        'governance/overview',
        'governance/policies',
        'governance/compliance',
        'governance/risk-management',
      ],
    },
    {
      type: 'category',
      label: 'Runbooks',
      items: [
        'runbooks/overview',
        'runbooks/server-provisioning',
        'runbooks/backup-and-restore',
        'runbooks/incident-response',
        'runbooks/user-management',
        'runbooks/monitoring-setup',
      ],
    },
    {
      type: 'category',
      label: 'Processes',
      items: [
        'processes/overview',
        'processes/change-management',
        'processes/incident-management',
        'processes/request-fulfillment',
        'processes/problem-management',
      ],
    },
    {
      type: 'category',
      label: 'Configuration',
      items: [
        'configuration/overview',
        'configuration/network-config',
        'configuration/server-config',
        'configuration/software-config',
        'configuration/security-config',
      ],
    },
    {
      type: 'category',
      label: 'Asset Life Cycle',
      items: [
        'asset-life-cycle/overview',
        'asset-life-cycle/procurement',
        'asset-life-cycle/deployment',
        'asset-life-cycle/maintenance',
        'asset-life-cycle/disposal',
      ],
    },
  ],
};

export default sidebars;
