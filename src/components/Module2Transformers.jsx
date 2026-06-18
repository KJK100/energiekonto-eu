import { useState } from 'react';
import { TrendingUp, ShoppingCart, BarChart2, Eye } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { mockTransformers, mockPortfolio, mockEnergyData } from '../data/mockData';

const TABS = ['Katalog', 'Mein Portfolio', 'Rendite'];

function TransformerCard({ t, onBuy }) {
  return (
    <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: `${t.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
            {t.icon}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#F1F5F9' }}>{t.name}</div>
            <span style={{ background: `${t.color}20`, color: t.color, padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{t.type}</span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: '#718096' }}>Verfügbar</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#F1F5F9' }}>{t.available}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div style={{ background: '#141820', borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 11, color: '#718096' }}>Preis EUT</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#F59E0B' }}>{t.priceEUT.toLocaleString()}</div>
        </div>
        <div style={{ background: '#141820', borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 11, color: '#718096' }}>Preis EUR</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#E2E8F0' }}>€{t.priceEUR.toLocaleString()}</div>
        </div>
        <div style={{ background: 'rgba(0,200,150,0.1)', borderRadius: 8, padding: 10 }}>
          <div style={{ fontSize: 11, color: '#718096' }}>Rendite p.a.</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#00C896' }}>{t.yieldPA}%</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => onBuy(t)}
          style={{
            flex: 1, background: 'linear-gradient(135deg, #00C896, #00A878)', color: '#fff',
            border: 'none', borderRadius: 8, padding: '10px 0', fontWeight: 700, fontSize: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
          }}>
          <ShoppingCart size={14} /> Kaufen
        </button>
        <button style={{
          background: '#2D3748', color: '#E2E8F0', border: '1px solid #4A5568',
          borderRadius: 8, padding: '10px 14px', cursor: 'pointer'
        }}>
          <Eye size={16} />
        </button>
      </div>
    </div>
  );
}

function BuyModal({ transformer, onClose, balance }) {
  const [qty, setQty] = useState(1);
  const [payment, setPayment] = useState('EUT');
  const [step, setStep] = useState(1);

  const total = transformer.priceEUT * qty;
  const canAfford = balance >= total;

  if (step === 3) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
        <div style={{ background: '#1A1F2E', borderRadius: 16, padding: 40, maxWidth: 420, width: '100%', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#F1F5F9', marginBottom: 8 }}>Kauf bestätigt!</div>
          <div style={{ fontSize: 14, color: '#718096', marginBottom: 8 }}>
            {qty}x {transformer.name}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#F59E0B', marginBottom: 24 }}>
            {total.toLocaleString()} EUT abgebucht
          </div>
          <div style={{ fontSize: 12, color: '#718096', marginBottom: 24, padding: '12px 16px', background: '#141820', borderRadius: 8 }}>
            🔗 Assetera On-Chain Bestätigung ausstehend (~ 5 Sek.)
          </div>
          <button onClick={onClose} style={{ background: 'linear-gradient(135deg,#00C896,#00A878)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            Zum Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
      <div style={{ background: '#1A1F2E', borderRadius: 16, padding: 28, maxWidth: 460, width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#F1F5F9' }}>Token kaufen</div>
          <button onClick={onClose} style={{ background: '#2D3748', border: 'none', color: '#E2E8F0', width: 28, height: 28, borderRadius: 6, cursor: 'pointer', fontSize: 16 }}>×</button>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {['Auswahl', 'Zahlung', 'Bestätigung'].map((s, i) => (
            <div key={s} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{
                height: 3, borderRadius: 2, marginBottom: 6,
                background: i < step ? '#00C896' : '#2D3748'
              }} />
              <div style={{ fontSize: 11, color: i < step ? '#00C896' : '#718096' }}>{s}</div>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <div style={{ background: '#141820', borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 18 }}>{transformer.icon} {transformer.name}</div>
              <div style={{ fontSize: 13, color: '#718096', marginTop: 4 }}>Rendite p.a.: {transformer.yieldPA}%</div>
            </div>
            <label style={{ fontSize: 13, color: '#718096', display: 'block', marginBottom: 6 }}>Anzahl Tokens</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: '#2D3748', border: 'none', color: '#E2E8F0', width: 36, height: 36, borderRadius: 8, cursor: 'pointer', fontSize: 18 }}>−</button>
              <input
                type="number" min="1" max={transformer.available} value={qty}
                onChange={e => setQty(Math.max(1, Math.min(transformer.available, +e.target.value)))}
                style={{ background: '#141820', border: '1px solid #2D3748', borderRadius: 8, color: '#F1F5F9', padding: '8px 12px', width: 80, textAlign: 'center', fontSize: 16, fontWeight: 700 }}
              />
              <button onClick={() => setQty(Math.min(transformer.available, qty + 1))} style={{ background: '#2D3748', border: 'none', color: '#E2E8F0', width: 36, height: 36, borderRadius: 8, cursor: 'pointer', fontSize: 18 }}>+</button>
            </div>
            <div style={{ background: '#141820', borderRadius: 8, padding: 14, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ color: '#718096', fontSize: 13 }}>Preis je Token</span>
                <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{transformer.priceEUT.toLocaleString()} EUT</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#718096', fontSize: 13 }}>Gesamt</span>
                <span style={{ color: '#F59E0B', fontWeight: 700, fontSize: 16 }}>{total.toLocaleString()} EUT</span>
              </div>
            </div>
            {!canAfford && <div style={{ color: '#EF4444', fontSize: 12, marginBottom: 12 }}>⚠️ Nicht genug EUT-Guthaben ({balance.toLocaleString()} EUT verfügbar)</div>}
            <button onClick={() => setStep(2)} disabled={!canAfford} style={{
              width: '100%', background: canAfford ? 'linear-gradient(135deg,#00C896,#00A878)' : '#2D3748',
              color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, cursor: canAfford ? 'pointer' : 'not-allowed', fontSize: 15
            }}>
              Weiter zur Zahlung →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <label style={{ fontSize: 13, color: '#718096', display: 'block', marginBottom: 8 }}>Zahlungsmethode</label>
            {['EUT', 'SEPA', 'Kreditkarte'].map(pm => (
              <div
                key={pm}
                onClick={() => setPayment(pm)}
                style={{
                  background: payment === pm ? 'rgba(0,200,150,0.1)' : '#141820',
                  border: `1px solid ${payment === pm ? '#00C896' : '#2D3748'}`,
                  borderRadius: 8, padding: '12px 16px', marginBottom: 8, cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                <span style={{ color: '#E2E8F0', fontWeight: 600 }}>
                  {pm === 'EUT' ? '🔋 EUT Guthaben' : pm === 'SEPA' ? '🏦 SEPA Überweisung' : '💳 Kreditkarte'}
                </span>
                {pm === 'EUT' && <span style={{ color: '#00C896', fontSize: 13 }}>{balance.toLocaleString()} verfügbar</span>}
              </div>
            ))}
            <div style={{ padding: '12px 16px', background: '#141820', borderRadius: 8, marginTop: 16, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#718096' }}>Gesamtbetrag</span>
                <span style={{ color: '#F59E0B', fontWeight: 700 }}>{total.toLocaleString()} EUT</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, background: '#2D3748', color: '#E2E8F0', border: '1px solid #4A5568', borderRadius: 8, padding: '12px 0', fontWeight: 600, cursor: 'pointer' }}>
                Zurück
              </button>
              <button onClick={() => setStep(3)} style={{ flex: 2, background: 'linear-gradient(135deg,#00C896,#00A878)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 0', fontWeight: 700, cursor: 'pointer' }}>
                🔗 Jetzt kaufen & signieren
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const yieldData = Array.from({ length: 12 }, (_, i) => ({
  month: ['Jan','Feb','Mär','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Dez'][i],
  EUT: Math.floor(Math.random() * 200 + 150),
}));

export default function Module2Transformers() {
  const [tab, setTab] = useState('Katalog');
  const [filter, setFilter] = useState('Alle');
  const [buyTarget, setBuyTarget] = useState(null);

  const types = ['Alle', 'PGU', 'STU', 'DCU', 'AAU'];
  const filtered = filter === 'Alle' ? mockTransformers : mockTransformers.filter(t => t.type === filter);

  const totalValue = mockPortfolio.reduce((s, t) => s + t.quantity * t.currentPrice, 0);
  const totalPnl = mockPortfolio.reduce((s, t) => s + t.unrealizedPnl, 0);
  const totalEUT = mockPortfolio.reduce((s, t) => s + t.eutDistributed, 0);

  return (
    <div style={{ padding: '24px 20px', maxWidth: 1100, margin: '0 auto' }}>
      {buyTarget && <BuyModal transformer={buyTarget} onClose={() => setBuyTarget(null)} balance={mockEnergyData.eutBalance} />}

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F1F5F9', margin: 0 }}>🔧 Transformatoren-Marktplatz</h1>
        <p style={{ fontSize: 13, color: '#718096', marginTop: 4 }}>Layer 2 — Verarbeitung: IoE Security Tokens kaufen & verkaufen</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#141820', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
              background: tab === t ? '#1A1F2E' : 'transparent',
              color: tab === t ? '#00C896' : '#718096',
              transition: 'all 0.2s'
            }}>
            {t}
          </button>
        ))}
      </div>

      {tab === 'Katalog' && (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            {types.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 13,
                  background: filter === f ? '#00C896' : '#2D3748',
                  color: filter === f ? '#fff' : '#E2E8F0',
                }}>
                {f}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {filtered.map(t => <TransformerCard key={t.id} t={t} onBuy={setBuyTarget} />)}
          </div>
        </>
      )}

      {tab === 'Mein Portfolio' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 12, color: '#718096', marginBottom: 6 }}>Portfoliowert</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#F59E0B' }}>{totalValue.toLocaleString()} EUT</div>
            </div>
            <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 12, color: '#718096', marginBottom: 6 }}>Unrealisierter Gewinn</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#00C896' }}>+{totalPnl.toLocaleString()} EUT</div>
            </div>
            <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 12, color: '#718096', marginBottom: 6 }}>EUT Ausschüttungen</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: '#A78BFA' }}>{totalEUT.toLocaleString()} EUT</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {mockPortfolio.map(p => (
              <div key={p.id} style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: `${p.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                      {p.icon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#F1F5F9' }}>{p.name}</div>
                      <div style={{ fontSize: 13, color: '#718096' }}>{p.quantity} Token • Einstieg: {p.buyPrice.toLocaleString()} EUT</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, color: '#718096' }}>Aktuell</div>
                      <div style={{ fontWeight: 700, color: '#E2E8F0' }}>{(p.quantity * p.currentPrice).toLocaleString()} EUT</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, color: '#718096' }}>Gewinn/Verlust</div>
                      <div style={{ fontWeight: 700, color: '#00C896' }}>+{p.unrealizedPnl.toLocaleString()} EUT</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 12, color: '#718096' }}>Ausschüttungen</div>
                      <div style={{ fontWeight: 700, color: '#A78BFA' }}>{p.eutDistributed.toLocaleString()} EUT</div>
                    </div>
                    <button style={{ background: '#EF4444', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
                      Verkaufen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'Rendite' && (
        <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 24 }}>
          <div style={{ fontWeight: 600, color: '#F1F5F9', marginBottom: 20 }}>Kumulierte EUT-Einnahmen — Alle Transformatoren</div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yieldData}>
              <XAxis dataKey="month" tick={{ fill: '#718096', fontSize: 12 }} />
              <YAxis tick={{ fill: '#718096', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 8 }} />
              <Line type="monotone" dataKey="EUT" stroke="#00C896" strokeWidth={2} dot={{ fill: '#00C896', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
