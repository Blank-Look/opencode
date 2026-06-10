import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ICT Knowledge Base',
  tagline: 'Governance. Runbooks. Processes. Configuration. Asset Life Cycle.',
  favicon: 'img/favicon.ico',
  trailingSlash: false,

  future: {
    v4: true,
  },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'Blank-Look',
  projectName: 'opencode',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Blank-Look/opencode/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ICT Knowledge Base',
      logo: {
        alt: 'ICT Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Sections',
          items: [
            {label: 'Governance', to: '/docs/governance/overview'},
            {label: 'Runbooks', to: '/docs/runbooks/overview'},
            {label: 'Processes', to: '/docs/processes/overview'},
            {label: 'Configuration', to: '/docs/configuration/overview'},
            {label: 'Asset Life Cycle', to: '/docs/asset-life-cycle/overview'},
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Blank-Look/opencode',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ICT Team. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
