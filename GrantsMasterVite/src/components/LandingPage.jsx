
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import FAQsSection from './FAQsSection';
import ErrorBoundary from './ErrorBoundary';
import { trackEvent } from '../core/Analytics';
import TeamSettingsPanel from './TeamSettingsPanel';

function LandingPageContent(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // Self-healing: validate tabs and activeTab
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      label: 'Overview',
      content: (
        <div className={styles.overviewTab}>
          <h2 className={styles.heroHeadline}>{t('welcome')}</h2>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '1.15rem', margin: '2rem 0' }}>
            <li style={{ marginBottom: '1rem' }}>⚡ Fast, AI-powered drafting</li>
            <li style={{ marginBottom: '1rem' }}>🛡️ Built-in validation</li>
            <li style={{ marginBottom: '1rem' }}>👥 Team & agency ready</li>
            <li style={{ marginBottom: '1rem' }}>📄 Export to PDF or Word</li>
            <li style={{ marginBottom: '1rem' }}>🧠 Agent refinement for Pro+</li>
          </ul>
          <button className={styles.ctaButton} onClick={() => setActiveTab(2)}>{t('pricing')}</button>
        </div>
      )
    },
    {
      label: 'Features',
      content: (
        <div className={styles.featuresTab}>
          <h2>Compare Tiers</h2>
          <table className={styles.tierTable}>
            <thead>
              <tr>
                <th>Tier</th>
                <th>Drafts</th>
                <th>Validator</th>
                <th>Team Seats</th>
                <th>Analytics</th>
                <th>Agent Refinement</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Free</td><td>5/mo</td><td>Basic</td><td>1</td><td>-</td><td>-</td></tr>
              <tr><td>Starter</td><td>15/mo</td><td>Standard</td><td>1</td><td>-</td><td>-</td></tr>
              <tr><td>Pro</td><td>Unlimited</td><td>Advanced</td><td>5</td><td>Yes</td><td>Yes</td></tr>
              <tr><td>Agency</td><td>Unlimited</td><td>Advanced</td><td>Unlimited</td><td>Yes</td><td>Yes</td></tr>
            </tbody>
          </table>
          <div className={styles.featureHighlights}>
            <div><span role="img" aria-label="Badge">🏅</span> All tiers include AI draft generation</div>
            <div><span role="img" aria-label="Rocket">🚀</span> Pro & Agency unlock analytics and agent refinement</div>
            <div><span role="img" aria-label="Team">👥</span> Agency supports unlimited team seats</div>
          </div>
          <button className={styles.ctaButton} onClick={() => navigate('/pricing')}>See Pricing</button>
        </div>
      )
    },
    {
      label: 'Pricing',
      content: (
        <div className={styles.pricingTab}>
          <h2>Plans & Pricing</h2>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <h3>Free</h3>
              <p><b>$0/mo</b></p>
              <ul>
                <li>5 drafts per month</li>
                <li>Basic validator</li>
                <li>1 team seat</li>
              </ul>
              <button className={styles.pricingButton} onClick={() => navigate('/signup')}>Start Free</button>
            </div>
            <div className={styles.pricingCard}>
              <h3>Starter</h3>
              <p><b>$19.99/mo</b></p>
              <ul>
                <li>15 drafts per month</li>
                <li>Standard validator</li>
                <li>1 team seat</li>
              </ul>
              <button className={styles.pricingButton} onClick={() => navigate('/upgrade/starter')}>Upgrade to Starter</button>
            </div>
            <div className={styles.pricingCard}>
              <h3>Pro</h3>
              <p><b>$49/mo</b></p>
              <ul>
                <li>Unlimited drafts</li>
                <li>Advanced validator</li>
                <li>5 team seats</li>
                <li>Analytics & agent refinement</li>
              </ul>
              <button className={styles.pricingButton} onClick={() => navigate('/upgrade')}>Upgrade to Pro</button>
            </div>
            <div className={styles.pricingCard}>
              <h3>Agency</h3>
              <p><b>$249/mo</b></p>
              <ul>
                <li>Unlimited drafts</li>
                <li>Advanced validator</li>
                <li>Unlimited team seats</li>
                <li>Analytics & agent refinement</li>
              </ul>
              <button className={styles.pricingButton} onClick={() => navigate('/contact/agency')}>Contact</button>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Render heartbeat: detect blank screen
  useEffect(() => {
    const root = document.querySelector(`.${styles.tabContainer}`);
    if (root && (root.children.length === 0 || root.offsetHeight === 0)) {
      console.warn('Render heartbeat failed — initiating auto-repair…');
      window.__REACT_RENDER_HEARTBEAT__ = 'failed';
    } else {
      window.__REACT_RENDER_HEARTBEAT__ = 'ok';
    }
  }, [activeTab, tabs]);

  // Tab validation
  let debugBanner = null;
  let safeTabs = Array.isArray(tabs) ? tabs : [];
  let safeActiveTab = typeof activeTab === 'number' && safeTabs[activeTab] ? activeTab : 0;
  if (!Array.isArray(tabs) || typeof activeTab !== 'number' || !safeTabs[safeActiveTab]) {
    debugBanner = (
      <div style={{ background: 'red', color: 'white', padding: '10px' }}>
        Auto-repair: Tab logic error detected. Tabs or activeTab was invalid.
      </div>
    );
    // Attempt to repair
    safeTabs = [
      { label: 'Overview', content: <div>Overview content</div> },
      { label: 'Features', content: <div>Features content</div> },
      { label: 'Pricing', content: <div>Pricing content</div> },
    ];
    safeActiveTab = 0;
    console.warn('Invalid tab index — auto-corrected');
  }

  return (
    <div className={styles.tabContainer}>
      {/* Debug banner */}
      <div style={{ background: 'yellow', padding: '10px' }}>
        React is live — activeTab: {activeTab}
      </div>
      {debugBanner}

      {/* Title */}
      <h1 className={styles.title}>GrantsMaster</h1>

      {/* Tabs */}
      <div className={styles.tabs}>
        {safeTabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={idx === safeActiveTab ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className={styles.tabContent}>{safeTabs[safeActiveTab]?.content}</div>


      {/* Team Settings for Agency tier */}
      <TeamSettingsPanel onSeatUpgrade={() => window.location.href = 'https://grantsmaster.lemonsqueezy.com/checkout/buy/bbba7a22-44c0-4082-8530-ef5cf48bfcc5'} />

      {/* FAQs Section */}
      <div className={styles.faqWrapper} style={{ margin: '3rem 0 2rem 0' }}>
        <FAQsSection />
      </div>
    </div>
  );
}

function LandingPage(props) {
  // ErrorBoundary for runtime crash protection
  return (
    <ErrorBoundary>
      <LandingPageContent {...props} />
    </ErrorBoundary>
  );
}

export default LandingPage;

