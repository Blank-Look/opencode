import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const sections = [
  {
    title: 'Governance',
    description: 'Policies, compliance frameworks, and risk management to ensure ICT aligns with business objectives.',
    link: '/docs/governance/overview',
  },
  {
    title: 'Runbooks',
    description: 'Step-by-step operational procedures for routine tasks, incident response, and system administration.',
    link: '/docs/runbooks/overview',
  },
  {
    title: 'Processes',
    description: 'Standardized workflows for change, incident, request, and problem management (ITIL-aligned).',
    link: '/docs/processes/overview',
  },
  {
    title: 'Configuration',
    description: 'Network, server, software, and security configuration baselines and reference documentation.',
    link: '/docs/configuration/overview',
  },
  {
    title: 'Asset Life Cycle',
    description: 'End-to-end management of ICT assets from procurement through deployment, maintenance, and disposal.',
    link: '/docs/asset-life-cycle/overview',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function SectionCard({title, description, link}: {title: string; description: string; link: string}) {
  return (
    <div className={styles.card}>
      <Link to={link} className={styles.cardLink}>
        <Heading as="h2">{title}</Heading>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout description="ICT Knowledge Base - Governance, Runbooks, Processes, Configuration & Asset Life Cycle">
      <HomepageHeader />
      <main>
        <section className={styles.sections}>
          <div className="container">
            <div className={styles.grid}>
              {sections.map((section) => (
                <SectionCard key={section.title} {...section} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
