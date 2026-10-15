import { useState } from 'react';
import { Zap, Settings, Diamond, User, Bell, FlaskConical, ExternalLink } from 'lucide-react';
import Module1Dashboard from './components/Module1Dashboard';
import Module2Transformers from './components/Module2Transformers';
import Module3Veredelt from './components/Module3Veredelt';
import { mockUser, mockEnergyData } from './data/mockData';

const NAV_ITEMS = [
  { id: 'energy', label: 'Energiekonto', icon: Zap, color: '#F59E0B' },
  { id: 'transformers', label: 'Transformatoren', icon: Settings, color: '#00C896' },
  { id: 'veredelt', label: 'Veredelt', icon: Diamond, color: '#A78BFA' },
  { id: 'profile', label: 'Profil', icon: User, color: '#718096' },
];

function DemoBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div style={{
      background: 'linear-gradient(90deg, rgba(124,58,237,0.15), rgba(0,200,150,0.1))',
      borderBottom: '1px solid rgba(124,58,237,0.3)',
      padding: '8px 20px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FlaskConical size={14} color="#A78BFA" />
          <span style={{ fontSize: 13, color: '#A78BFA', fontWeight: 700 }}>Demo-Applikation</span>
          <span style={{ fontSize: 13, color: '#718096' }}>— Alle Daten sind Beispieldaten. Kein echtes Konto, keine echten Transaktionen.</span>
          <a
            href="https://ioe-hub.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#00C896', fontWeight: 600, textDecoration: 'none', marginLeft: 8 }}>
            ioe-hub.com <ExternalLink size={11} />
          </a>
        </div>
        <button onClick={() => setDismissed(true)} style={{ background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontSize: 16, lineHeight: 1, flexShrink: 0 }}>×</button>
      </div>
    </div>
  );
}

function ImpressumPage() {
  return (
    <div style={{ padding: '24px 20px', maxWidth: 700, margin: '0 auto' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F1F5F9', margin: '0 0 6px' }}>Impressum</h1>
      <div style={{ fontSize: 13, color: '#718096', marginBottom: 28 }}>Angaben gemäß § 5 ECG (Österreich)</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 12, color: '#718096', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Demo-Hinweis</div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(124,58,237,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FlaskConical size={18} color="#A78BFA" />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F1F5F9', marginBottom: 6 }}>Diese Applikation ist eine Demo</div>
              <div style={{ fontSize: 13, color: '#A0AEC0', lineHeight: 1.6 }}>
                energiekonto.eu ist eine Demonstration des Internet of Energy (IoE) Ökosystems.
                Sämtliche angezeigten Daten, Guthaben, Transaktionen, Energiewerte und Token-Bestände
                sind fiktive Beispieldaten und haben keinen realen Wert. Es werden keine echten
                Finanztransaktionen durchgeführt.
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 12, color: '#718096', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Betreiber</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            <div>
              <div style={{ fontSize: 13, color: '#718096', marginBottom: 4 }}>Verantwortlich für den Inhalt</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F1F5F9' }}>Klaus Kohlmayr</div>
              <div style={{ fontSize: 13, color: '#A0AEC0' }}>Internet of Energy</div>
            </div>
            <div>
              <div style={{ fontSize: 13, color: '#718096', marginBottom: 4 }}>Co-Autor</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#F1F5F9' }}>David Spanberger</div>
              <div style={{ fontSize: 13, color: '#A0AEC0' }}>Internet of Energy</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 12, color: '#718096', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>Plattform & Kontakt</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1E2535' }}>
              <span style={{ fontSize: 13, color: '#A0AEC0' }}>Offizielles IoE-Hub</span>
              <a href="https://ioe-hub.com" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#00C896', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                ioe-hub.com <ExternalLink size={13} />
              </a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1E2535' }}>
              <span style={{ fontSize: 13, color: '#A0AEC0' }}>Applikation</span>
              <span style={{ fontSize: 14, color: '#E2E8F0', fontWeight: 600 }}>energiekonto.eu</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1E2535' }}>
              <span style={{ fontSize: 13, color: '#A0AEC0' }}>Version</span>
              <span style={{ fontSize: 14, color: '#E2E8F0', fontWeight: 600 }}>Demo v1.0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
              <span style={{ fontSize: 13, color: '#A0AEC0' }}>Stand</span>
              <span style={{ fontSize: 14, color: '#E2E8F0', fontWeight: 600 }}>Oktober 2026</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 24 }}>
          <div style={{ fontSize: 12, color: '#718096', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Haftungsausschluss</div>
          <div style={{ fontSize: 13, color: '#A0AEC0', lineHeight: 1.7 }}>
            Die auf dieser Demo-Plattform dargestellten Inhalte dienen ausschließlich zu Demonstrationszwecken.
            Alle gezeigten Energiewerte, Token-Kurse, Renditeangaben und Transaktionen sind fiktiv.
            Investitionsentscheidungen dürfen nicht auf Basis dieser Demo getroffen werden.
            Für das echte Internet of Energy Ökosystem besuche bitte{' '}
            <a href="https://ioe-hub.com" target="_blank" rel="noopener noreferrer"
              style={{ color: '#00C896', fontWeight: 600, textDecoration: 'none' }}>ioe-hub.com</a>.
          </div>
        </div>

      </div>
    </div>
  );
}

function ProfilePage({ setActiveNav }) {
  return (
    <div style={{ padding: '24px 20px', maxWidth: 600, margin: '0 auto' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F1F5F9', margin: '0 0 24px' }}>Profil & Einstellungen</h1>
      <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 24, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: 'linear-gradient(135deg,#00C896,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22, color: '#fff' }}>
          {mockUser.avatar}
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F1F5F9' }}>{mockUser.name}</div>
          <div style={{ fontSize: 13, color: '#718096', fontFamily: 'monospace' }}>{mockUser.wallet}</div>
          <span style={{ background: 'rgba(0,200,150,0.15)', color: '#00C896', padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
            Verifiziert
          </span>
        </div>
      </div>
      {[
        { label: 'Wallet & Sicherheit', items: ['Assetera Wallet verbunden', '2FA aktiv (TOTP)', 'Session-Management'] },
        { label: 'Benachrichtigungen', items: ['EUT-Eingang', 'Loyalty Points Ablauf', 'Grais AI Reports'] },
        { label: 'Sprache & Darstellung', items: ['Deutsch (Standard)', 'Dark Mode aktiv', 'WCAG 2.1 AA konform'] },
      ].map(section => (
        <div key={section.label} style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20, marginBottom: 12 }}>
          <div style={{ fontWeight: 600, color: '#E2E8F0', marginBottom: 12 }}>{section.label}</div>
          {section.items.map(item => (
            <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1E2535' }}>
              <span style={{ fontSize: 14, color: '#CBD5E0' }}>{item}</span>
              <span style={{ fontSize: 13, color: '#00C896' }}>Aktiv</span>
            </div>
          ))}
        </div>
      ))}
      <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20, marginBottom: 12 }}>
        <div style={{ fontWeight: 600, color: '#E2E8F0', marginBottom: 12 }}>Onboarding-Status (3/5)</div>
        {[
          { step: 'Wallet verbinden', done: true },
          { step: 'Erste Node erkunden', done: true },
          { step: 'Transformator kennenlernen', done: true },
          { step: 'AI-Token-Demo', done: false },
          { step: 'Bonus-Galaxy-Tour', done: false },
        ].map((s, i) => (
          <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid #1E2535' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: s.done ? 'rgba(0,200,150,0.2)' : '#2D3748', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0, color: s.done ? '#00C896' : '#718096' }}>
              {s.done ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: 14, color: s.done ? '#CBD5E0' : '#718096' }}>{s.step}</span>
            {!s.done && <span style={{ marginLeft: 'auto', background: '#F59E0B', color: '#000', padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>Jetzt starten</span>}
          </div>
        ))}
      </div>
      <button
        onClick={() => setActiveNav('impressum')}
        style={{ width: '100%', background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: '14px 20px', color: '#718096', fontSize: 13, fontWeight: 600, cursor: 'pointer', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Impressum & Demo-Hinweise</span>
        <span>→</span>
      </button>
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState('energy');
  const [notifShow, setNotifShow] = useState(true);

  const pages = {
    energy: () => <Module1Dashboard />,
    transformers: () => <Module2Transformers />,
    veredelt: () => <Module3Veredelt />,
    profile: () => <ProfilePage setActiveNav={setActiveNav} />,
    impressum: () => <ImpressumPage />,
  };
  const ActivePage = pages[activeNav] || pages.energy;

  return (
    <div style={{ minHeight: '100vh', background: '#0F1117', display: 'flex', flexDirection: 'column' }}>
      {/* Demo Banner — always visible at top */}
      <DemoBanner />

      {/* Top Header */}
      <div style={{ background: '#141820', borderBottom: '1px solid #1E2535', padding: '0 20px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#00C896,#00A878)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={18} color="#fff" fill="#fff" />
            </div>
            <div>
              <span style={{ fontWeight: 800, fontSize: 16, color: '#F1F5F9' }}>energiekonto</span>
              <span style={{ fontWeight: 400, fontSize: 16, color: '#00C896' }}>.eu</span>
            </div>
            <span style={{ background: 'rgba(124,58,237,0.2)', color: '#A78BFA', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20, letterSpacing: '0.05em' }}>
              DEMO
            </span>
          </div>

          <div style={{ display: 'flex', gap: 2 }}>
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: active ? `${item.color}18` : 'transparent',
                    color: active ? item.color : '#718096',
                    fontWeight: active ? 700 : 500, fontSize: 13,
                  }}>
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F59E0B' }}>{mockEnergyData.eutBalance.toLocaleString('de-AT')} EUT</div>
              <div style={{ fontSize: 11, color: '#718096' }}>Demo-Guthaben</div>
            </div>
            <div
              onClick={() => setActiveNav('profile')}
              style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#00C896,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, color: '#fff', cursor: 'pointer' }}>
              {mockUser.avatar}
            </div>
          </div>
        </div>
      </div>

      {notifShow && (
        <div style={{ background: 'rgba(0,200,150,0.1)', borderBottom: '1px solid rgba(0,200,150,0.2)', padding: '8px 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bell size={13} color="#00C896" />
              <span style={{ fontSize: 13, color: '#00C896', fontWeight: 600 }}>+340.50 EUT Regelenergie-Erlös eingegangen — Heute 06:00</span>
              <span style={{ fontSize: 12, color: '#718096' }}>(Demo-Daten)</span>
            </div>
            <button onClick={() => setNotifShow(false)} style={{ background: 'none', border: 'none', color: '#718096', cursor: 'pointer', fontSize: 16, lineHeight: 1 }}>×</button>
          </div>
        </div>
      )}

      <div style={{ flex: 1 }}>
        <ActivePage />
      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #1E2535', padding: '16px 20px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 11, color: '#4A5568' }}>
            energiekonto.eu — Demo-Applikation | Internet of Energy Platform | v1.0 | Klaus Kohlmayr & David Spanberger
          </span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <a
              href="https://ioe-hub.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 12, color: '#00C896', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              ioe-hub.com <ExternalLink size={10} />
            </a>
            <button
              onClick={() => setActiveNav('impressum')}
              style={{ fontSize: 12, color: '#718096', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
              Impressum
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
