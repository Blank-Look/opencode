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
    number: '01',
  },
  {
    title: 'Runbooks',
    description: 'Step-by-step operational procedures for routine tasks, incident response, and system administration.',
    link: '/docs/runbooks/overview',
    number: '02',
  },
  {
    title: 'Processes',
    description: 'Standardized workflows for change, incident, request, and problem management (ITIL-aligned).',
    link: '/docs/processes/overview',
    number: '03',
  },
  {
    title: 'Configuration',
    description: 'Network, server, software, and security configuration baselines and reference documentation.',
    link: '/docs/configuration/overview',
    number: '04',
  },
  {
    title: 'Asset Life Cycle',
    description: 'End-to-end management of ICT assets from procurement through deployment, maintenance, and disposal.',
    link: '/docs/asset-life-cycle/overview',
    number: '05',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <p className={styles.heroEyebrow}>ICT Team Knowledge Base</p>
        <Heading as="h1" className={styles.heroTitle}>
          Built. Not Born.
        </Heading>
        <p className={styles.heroDescription}>
          Great ICT operations are built through purpose, process, and consistency.
          Everything you need to run a <strong>governed, automated, and resilient</strong> team — in one place.
        </p>
      </div>
    </header>
  );
}

function SectionCard({title, description, link, number}: {title: string; description: string; link: string; number: string}) {
  return (
    <Link to={link} className={styles.cardLink}>
      <div className={styles.card}>
        <span className={styles.cardNumber}>{number}</span>
        <Heading as="h2" className={styles.cardTitle}>{title}</Heading>
        <p className={styles.cardDescription}>{description}</p>
        <span className={styles.cardArrow}>→</span>
      </div>
    </Link>
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
