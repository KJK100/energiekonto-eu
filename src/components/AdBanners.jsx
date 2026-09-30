import { useState } from 'react';
import { ChevronRight, ChevronLeft, ExternalLink, X } from 'lucide-react';
import { mockSalzburgAGOffers } from '../data/mockData';

// ─── Salzburg AG Hero Banner (Karussell) ────────────────────────────────────
export function SalzburgAGBanner() {
  const [idx, setIdx] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const offer = mockSalzburgAGOffers[idx];
  const prev = () => setIdx(i => (i - 1 + mockSalzburgAGOffers.length) % mockSalzburgAGOffers.length);
  const next = () => setIdx(i => (i + 1) % mockSalzburgAGOffers.length);

  return (
    <div style={{
      position: 'relative',
      borderRadius: 14,
      overflow: 'hidden',
      marginBottom: 20,
      background: 'linear-gradient(135deg, #1a0608 0%, #2d0a0d 40%, #1A1F2E 100%)',
      border: '1px solid rgba(227,6,19,0.35)',
    }}>
      {/* Red accent stripe */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: '#E30613' }} />

      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.4)', border: 'none', color: '#999', width: 24, height: 24, borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
        <X size={13} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', padding: '20px 20px 20px 24px', gap: 20 }}>
        {/* Logo block */}
        <div style={{ flexShrink: 0, width: 72, height: 72, borderRadius: 14, background: '#E30613', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <span style={{ fontSize: 24 }}>⚡</span>
          <span style={{ fontSize: 8, fontWeight: 800, color: '#fff', letterSpacing: '0.05em', textAlign: 'center', lineHeight: 1.2 }}>SALZBURG{'\n'}AG</span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{ background: '#E30613', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Partner
            </span>
            <span style={{ background: 'rgba(227,6,19,0.15)', color: '#FF6B6B', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
              {offer.badge}
            </span>
            <span style={{ fontSize: 11, color: '#718096' }}>{offer.tag}</span>
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#F1F5F9', marginBottom: 4 }}>{offer.title}</div>
          <div style={{ fontSize: 13, color: '#A0AEC0', marginBottom: 10, lineHeight: 1.5 }}>{offer.description}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(227,6,19,0.15)', border: '1px solid rgba(227,6,19,0.3)', borderRadius: 8, padding: '6px 14px' }}>
              <span style={{ fontSize: 14, fontWeight: 800, color: '#FF6B6B' }}>{offer.highlight}</span>
            </div>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: '#E30613', color: '#fff', border: 'none',
              borderRadius: 8, padding: '8px 16px', fontWeight: 700, fontSize: 13, cursor: 'pointer'
            }}>
              {offer.cta} <ExternalLink size={12} />
            </button>
          </div>
        </div>

        {/* Carousel controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
          <button onClick={prev} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#E2E8F0', width: 28, height: 28, borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={14} />
          </button>
          <div style={{ textAlign: 'center', fontSize: 11, color: '#718096' }}>{idx + 1}/{mockSalzburgAGOffers.length}</div>
          <button onClick={next} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#E2E8F0', width: 28, height: 28, borderRadius: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, paddingBottom: 14 }}>
        {mockSalzburgAGOffers.map((_, i) => (
          <div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 20 : 6, height: 6, borderRadius: 3, background: i === idx ? '#E30613' : '#4A5568', cursor: 'pointer', transition: 'all 0.3s' }} />
        ))}
      </div>
    </div>
  );
}

// ─── Salzburg AG Inline Card (kompakt, für Seitenleiste / zwischen Inhalten) ─
export function SalzburgAGCard({ offerId = 'sag-1' }) {
  const offer = mockSalzburgAGOffers.find(o => o.id === offerId) || mockSalzburgAGOffers[0];
  return (
    <div style={{
      borderRadius: 12,
      background: 'linear-gradient(135deg, #1a0608, #1A1F2E)',
      border: '1px solid rgba(227,6,19,0.3)',
      padding: 16,
      display: 'flex',
      gap: 14,
      alignItems: 'flex-start',
    }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: '#E30613', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 20 }}>⚡</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}>
          <span style={{ background: '#E30613', color: '#fff', fontSize: 9, fontWeight: 800, padding: '1px 6px', borderRadius: 20 }}>SALZBURG AG</span>
          <span style={{ background: 'rgba(227,6,19,0.15)', color: '#FF6B6B', fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 20 }}>{offer.badge}</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#F1F5F9', marginBottom: 2 }}>{offer.title}</div>
        <div style={{ fontSize: 11, color: '#A0AEC0', marginBottom: 8, lineHeight: 1.4 }}>{offer.description}</div>
        <button style={{ background: '#E30613', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', fontWeight: 700, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
          {offer.cta} <ExternalLink size={10} />
        </button>
      </div>
    </div>
  );
}

// ─── Gutschein.at Badge (für Voucher-Karten) ─────────────────────────────────
export function GutscheinAtBadge() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(255,107,0,0.12)', border: '1px solid rgba(255,107,0,0.25)', borderRadius: 20, padding: '2px 8px' }}>
      <span style={{ fontSize: 10 }}>🎟️</span>
      <span style={{ fontSize: 10, fontWeight: 700, color: '#FF6B00' }}>gutschein.at</span>
    </div>
  );
}

// ─── Gutschein.at Header Banner (im Bonus Galaxy Tab) ────────────────────────
export function GutscheinAtBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div style={{
      borderRadius: 12,
      background: 'linear-gradient(135deg, #1a0e00, #1A1F2E)',
      border: '1px solid rgba(255,107,0,0.35)',
      padding: '16px 20px',
      marginBottom: 20,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
      flexWrap: 'wrap',
      position: 'relative',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #FF6B00, #FFB347)', borderRadius: '12px 12px 0 0' }} />
      <button onClick={() => setDismissed(true)} style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.3)', border: 'none', color: '#718096', width: 22, height: 22, borderRadius: 5, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <X size={11} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: 12, background: 'linear-gradient(135deg, #FF6B00, #FFB347)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>
          🎟️
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#FF6B00' }}>gutschein.at</span>
            <span style={{ background: 'rgba(255,107,0,0.2)', color: '#FFB347', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>Partner</span>
          </div>
          <div style={{ fontSize: 13, color: '#A0AEC0' }}>
            Über <strong style={{ color: '#E2E8F0' }}>500+ Österreich-Gutscheine</strong> — direkt mit EUT & Loyalty Points einlösbar
          </div>
        </div>
      </div>
      <button style={{
        background: 'linear-gradient(135deg, #FF6B00, #FFB347)',
        color: '#fff', border: 'none', borderRadius: 8,
        padding: '10px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0
      }}>
        Alle Angebote <ExternalLink size={13} />
      </button>
    </div>
  );
}

// ─── Kleines Salzburg AG Widget (für Dashboard-Sidebar-Bereich) ──────────────
export function SalzburgAGMiniWidget() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a0608 0%, #1A1F2E 100%)',
      border: '1px solid rgba(227,6,19,0.25)',
      borderRadius: 10,
      padding: '12px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
    }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#E30613', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 16 }}>⚡</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, color: '#FF6B6B', fontWeight: 700, marginBottom: 2 }}>SALZBURG AG TIPP</div>
        <div style={{ fontSize: 12, color: '#E2E8F0', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          Ökostrom + 100 EUT Bonus
        </div>
      </div>
      <button style={{ background: '#E30613', border: 'none', color: '#fff', borderRadius: 6, padding: '4px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
        Info
      </button>
    </div>
  );
}
