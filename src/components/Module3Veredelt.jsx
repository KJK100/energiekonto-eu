import { useState } from 'react';
import { Zap, ShoppingBag, ChevronRight, QrCode } from 'lucide-react';
import { mockAIWallet, mockSpeaxPackages, mockGraisPackages, mockTaskLog, mockVouchers, mockOwnedVouchers, mockEnergyData, mockGutscheinAtVouchers } from '../data/mockData';
import { GutscheinAtBanner, GutscheinAtBadge, SalzburgAGCard } from './AdBanners';

const TABS = ['AI Tokens', 'Bonus Galaxy', 'Mein Wallet'];

function AIWalletCard({ icon, name, credits, expiry, color, packages, onBuy }) {
  const [selected, setSelected] = useState(null);
  const [purchased, setPurchased] = useState(false);

  const handleBuy = () => {
    if (!selected) return;
    setPurchased(true);
    setTimeout(() => setPurchased(false), 3000);
  };

  return (
    <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
            {icon}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#F1F5F9' }}>{name}</div>
            <div style={{ fontSize: 12, color: '#718096' }}>Ablauf: {expiry}</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 28, fontWeight: 700, color }}>
            {credits}
          </div>
          <div style={{ fontSize: 12, color: '#718096' }}>Credits</div>
        </div>
      </div>

      <div style={{ height: 6, borderRadius: 3, background: '#2D3748', marginBottom: 20, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRadius: 3, background: color, width: `${Math.min(100, credits / 10)}%` }} />
      </div>

      <div style={{ fontSize: 13, fontWeight: 600, color: '#718096', marginBottom: 10 }}>Credits aufstocken</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 16 }}>
        {packages.map(pkg => (
          <div
            key={pkg.id}
            onClick={() => setSelected(pkg)}
            style={{
              background: selected?.id === pkg.id ? `${color}15` : '#141820',
              border: `1px solid ${selected?.id === pkg.id ? color : '#2D3748'}`,
              borderRadius: 8, padding: '10px 12px', cursor: 'pointer', position: 'relative'
            }}>
            {pkg.badge && (
              <div style={{ position: 'absolute', top: -8, right: 8, background: color, color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
                {pkg.badge}
              </div>
            )}
            <div style={{ fontWeight: 700, color: '#E2E8F0', fontSize: 14 }}>{pkg.name}</div>
            <div style={{ fontSize: 12, color: '#718096' }}>{pkg.credits} Credits</div>
            <div style={{ fontSize: 13, fontWeight: 700, color, marginTop: 4 }}>
              {pkg.priceEUT === 0 ? 'Gratis' : `${pkg.priceEUT} EUT`}
            </div>
          </div>
        ))}
      </div>

      {purchased ? (
        <div style={{ textAlign: 'center', padding: '12px 0', color: '#00C896', fontWeight: 700, fontSize: 15 }}>
          ✅ Credits erfolgreich aufgestockt!
        </div>
      ) : (
        <button
          onClick={handleBuy}
          disabled={!selected}
          style={{
            width: '100%', background: selected ? `linear-gradient(135deg, ${color}, ${color}BB)` : '#2D3748',
            color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0',
            fontWeight: 700, fontSize: 14, cursor: selected ? 'pointer' : 'not-allowed'
          }}>
          {selected ? `${selected.credits} Credits kaufen — ${selected.priceEUT} EUT` : 'Paket auswählen'}
        </button>
      )}
    </div>
  );
}

function TaskStatusWidget() {
  const activeTasks = mockTaskLog.filter(t => t.status === 'active');
  if (activeTasks.length === 0) return null;
  return (
    <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 12, padding: 16, marginBottom: 20 }}>
      <div style={{ fontWeight: 600, color: '#A78BFA', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="pulse-dot" style={{ background: '#A78BFA' }}></span>
        Laufende Speax Tasks
      </div>
      {activeTasks.map(t => (
        <div key={t.id} style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
            <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{t.type}</span>
            <span style={{ color: '#718096' }}>{t.progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${t.progress}%`, background: 'linear-gradient(90deg, #7C3AED, #A78BFA)' }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function VoucherCard({ v, balance, onBuy }) {
  return (
    <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: `${v.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            {v.logo}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#F1F5F9' }}>{v.brand}</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 3 }}>
              <span style={{ background: '#2D3748', color: '#A0AEC0', padding: '2px 8px', borderRadius: 20, fontSize: 11 }}>{v.category}</span>
              {v.source === 'gutschein.at' && <GutscheinAtBadge />}
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#F1F5F9' }}>€{v.value}</div>
          <div style={{ fontSize: 11, color: '#718096' }}>Gutscheinwert</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => onBuy(v, 'EUT')}
          style={{
            flex: 1, background: 'linear-gradient(135deg,#00C896,#00A878)', color: '#fff',
            border: 'none', borderRadius: 8, padding: '9px 0', fontWeight: 700, fontSize: 13, cursor: 'pointer'
          }}>
          {v.priceEUT} EUT
        </button>
        <button
          onClick={() => onBuy(v, 'loyalty')}
          style={{
            flex: 1, background: '#2D3748', color: '#F59E0B',
            border: '1px solid rgba(245,158,11,0.3)', borderRadius: 8, padding: '9px 0', fontWeight: 700, fontSize: 13, cursor: 'pointer'
          }}>
          ⭐ {v.priceLoyalty.toLocaleString()} Pts
        </button>
      </div>
    </div>
  );
}

function PurchaseModal({ voucher, method, onClose }) {
  const [done, setDone] = useState(false);
  const handleConfirm = () => setDone(true);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div style={{ background: '#1A1F2E', borderRadius: 16, padding: 32, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        {done ? (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎁</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Gutschein erhalten!</div>
            <div style={{ fontSize: 14, color: '#718096', marginBottom: 4 }}>{voucher.logo} {voucher.brand} — €{voucher.value}</div>
            <div style={{ background: '#141820', borderRadius: 8, padding: '12px 16px', marginTop: 16, marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: '#718096', marginBottom: 4 }}>Dein Gutschein-Code</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#00C896', letterSpacing: '0.1em' }}>
                {voucher.brand.substring(0, 3).toUpperCase()}-{Math.random().toString(36).substring(2, 6).toUpperCase()}-IOE{Math.floor(Math.random() * 9)}
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'linear-gradient(135deg,#00C896,#00A878)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, cursor: 'pointer' }}>
              Zum Gutschein-Wallet
            </button>
          </>
        ) : (
          <>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{voucher.logo}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#F1F5F9', marginBottom: 4 }}>{voucher.brand} — €{voucher.value}</div>
            <div style={{ background: '#141820', borderRadius: 8, padding: 14, margin: '16px 0', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#718096', fontSize: 13 }}>Zahlung mit</span>
                <span style={{ color: '#E2E8F0', fontWeight: 600 }}>
                  {method === 'EUT' ? `${voucher.priceEUT} EUT` : `${voucher.priceLoyalty.toLocaleString()} Loyalty Points`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#718096', fontSize: 13 }}>Gutscheinwert</span>
                <span style={{ color: '#00C896', fontWeight: 700 }}>€{voucher.value}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={onClose} style={{ flex: 1, background: '#2D3748', color: '#E2E8F0', border: '1px solid #4A5568', borderRadius: 8, padding: '12px 0', fontWeight: 600, cursor: 'pointer' }}>
                Abbrechen
              </button>
              <button onClick={handleConfirm} style={{ flex: 2, background: 'linear-gradient(135deg,#00C896,#00A878)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, cursor: 'pointer' }}>
                Jetzt kaufen ✓
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function WalletView() {
  const [activeCode, setActiveCode] = useState(null);

  return (
    <div>
      <div style={{ fontWeight: 600, color: '#F1F5F9', marginBottom: 16 }}>Mein Gutschein-Wallet</div>
      {mockOwnedVouchers.map(v => (
        <div key={v.id} style={{
          background: '#1A1F2E', border: `1px solid ${v.status === 'active' ? '#2D3748' : '#1E2535'}`, borderRadius: 12, padding: 20, marginBottom: 12,
          opacity: v.status === 'redeemed' ? 0.6 : 1
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: v.status === 'active' ? 12 : 0 }}>
            <div>
              <div style={{ fontWeight: 700, color: '#F1F5F9' }}>{v.brand}</div>
              <div style={{ fontSize: 12, color: '#718096' }}>Ablauf: {v.expires}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: v.status === 'active' ? '#00C896' : '#718096' }}>€{v.remaining}</div>
                <div style={{ fontSize: 11, color: '#718096' }}>Restwert von €{v.value}</div>
              </div>
              <span style={{
                padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: v.status === 'active' ? 'rgba(0,200,150,0.15)' : 'rgba(113,128,150,0.15)',
                color: v.status === 'active' ? '#00C896' : '#718096'
              }}>
                {v.status === 'active' ? 'Aktiv' : 'Eingelöst'}
              </span>
            </div>
          </div>
          {v.status === 'active' && (
            <div style={{ background: '#141820', borderRadius: 8, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: '#718096', marginBottom: 2 }}>Code</div>
                <div style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: '#A78BFA', letterSpacing: '0.05em' }}>
                  {activeCode === v.id ? v.code : '••••-••••-•••••'}
                </div>
              </div>
              <button
                onClick={() => setActiveCode(activeCode === v.id ? null : v.id)}
                style={{ background: '#2D3748', border: 'none', color: '#E2E8F0', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
                {activeCode === v.id ? 'Verbergen' : 'Code anzeigen'}
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Module3Veredelt() {
  const [tab, setTab] = useState('AI Tokens');
  const [voucherFilter, setVoucherFilter] = useState('Alle');
  const [buyTarget, setBuyTarget] = useState(null);
  const [buyMethod, setBuyMethod] = useState(null);

  const [gutscheinSource, setGutscheinSource] = useState('alle');
  const categories = ['Alle', 'Shopping', 'Reise', 'Gastronomie', 'Erlebnis'];
  const allVouchers = [...mockVouchers, ...mockGutscheinAtVouchers];
  const sourceFiltered = gutscheinSource === 'gutschein.at' ? mockGutscheinAtVouchers : gutscheinSource === 'bonus-galaxy' ? mockVouchers : allVouchers;
  const filteredVouchers = voucherFilter === 'Alle' ? sourceFiltered : sourceFiltered.filter(v => v.category === voucherFilter);

  const handleBuy = (v, method) => {
    setBuyTarget(v);
    setBuyMethod(method);
  };

  return (
    <div style={{ padding: '24px 20px', maxWidth: 1100, margin: '0 auto' }}>
      {buyTarget && <PurchaseModal voucher={buyTarget} method={buyMethod} onClose={() => { setBuyTarget(null); setBuyMethod(null); }} />}

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F1F5F9', margin: 0 }}>✨ Veredelte Energie</h1>
        <p style={{ fontSize: 13, color: '#718096', marginTop: 4 }}>Layer 3 — Assets & Cash Cows: AI Tokens + Bonus Galaxy</p>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#141820', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === t ? '#1A1F2E' : 'transparent',
              color: tab === t ? '#A78BFA' : '#718096',
            }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'AI Tokens' && (
        <div>
          <TaskStatusWidget />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20, marginBottom: 24 }}>
            <AIWalletCard
              icon="🤖"
              name="Speax AI — Task Agent"
              credits={mockAIWallet.speaxCredits}
              expiry={mockAIWallet.speaxExpiry}
              color="#7C3AED"
              packages={mockSpeaxPackages}
            />
            <AIWalletCard
              icon="💬"
              name="Grais AI — Kommunikation"
              credits={mockAIWallet.graisCredits}
              expiry={mockAIWallet.graisExpiry}
              color="#EC4899"
              packages={mockGraisPackages}
            />
          </div>

          <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 600, color: '#F1F5F9', marginBottom: 16 }}>Task-Nutzungshistorie</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {mockTaskLog.map(t => (
                <div key={t.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0', borderBottom: '1px solid #1E2535'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 11, fontFamily: 'monospace', color: '#718096' }}>{t.id}</span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0' }}>{t.type}</div>
                      <div style={{ fontSize: 12, color: '#718096' }}>{t.ts}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 13, color: '#7C3AED', fontWeight: 600 }}>{t.credits} Credits</span>
                    <span style={{
                      padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                      background: t.status === 'completed' ? 'rgba(0,200,150,0.15)' : t.status === 'active' ? 'rgba(124,58,237,0.15)' : 'rgba(239,68,68,0.15)',
                      color: t.status === 'completed' ? '#00C896' : t.status === 'active' ? '#A78BFA' : '#EF4444'
                    }}>
                      {t.status === 'completed' ? '✓ Fertig' : t.status === 'active' ? '⟳ Aktiv' : '✗ Fehler'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'Bonus Galaxy' && (
        <div>
          {/* Gutschein.at Partner Banner */}
          <GutscheinAtBanner />

          {/* Guthaben-Info */}
          <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 10, padding: '12px 16px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <div style={{ fontSize: 13, color: '#E2E8F0' }}>
              ⭐ <strong>{mockEnergyData.loyaltyPoints.toLocaleString()}</strong> Loyalty Points &nbsp;|&nbsp;
              🔋 <strong>{mockEnergyData.eutBalance.toLocaleString()}</strong> EUT
            </div>
          </div>

          {/* Source Filter */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
            {[
              { key: 'alle', label: '🌐 Alle Angebote' },
              { key: 'bonus-galaxy', label: '✨ Bonus Galaxy' },
              { key: 'gutschein.at', label: '🎟️ gutschein.at' },
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setGutscheinSource(s.key)}
                style={{
                  padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 12,
                  background: gutscheinSource === s.key ? (s.key === 'gutschein.at' ? '#FF6B00' : '#F59E0B') : '#2D3748',
                  color: gutscheinSource === s.key ? '#fff' : '#A0AEC0',
                }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setVoucherFilter(c)}
                style={{
                  padding: '5px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12,
                  background: voucherFilter === c ? '#4A5568' : 'transparent',
                  color: voucherFilter === c ? '#E2E8F0' : '#718096',
                  border: `1px solid ${voucherFilter === c ? '#4A5568' : '#2D3748'}`,
                }}>
                {c}
              </button>
            ))}
          </div>

          {/* Voucher Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {filteredVouchers.map(v => <VoucherCard key={v.id} v={v} balance={mockEnergyData.eutBalance} onBuy={handleBuy} />)}
          </div>

          {/* Salzburg AG Cross-Sell */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 12, color: '#718096', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>
              Partner-Empfehlung
            </div>
            <SalzburgAGCard offerId="sag-3" />
          </div>
        </div>
      )}

      {tab === 'Mein Wallet' && <WalletView />}
    </div>
  );
}
