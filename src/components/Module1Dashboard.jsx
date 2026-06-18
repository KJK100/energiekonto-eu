import { useState, useEffect } from 'react';
import { Zap, TrendingUp, TrendingDown, Battery, Star, Activity, ArrowUpRight, ArrowDownRight, Clock, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { mockEnergyData, mockEnergyHistory, mockTransactions, mockNodes } from '../data/mockData';

function StatCard({ icon, label, value, unit, change, color = '#00C896', sub }) {
  return (
    <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ color: '#718096', fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#F1F5F9' }}>
            {value} <span style={{ fontSize: 14, color: '#718096', fontWeight: 400 }}>{unit}</span>
          </div>
          {sub && <div style={{ fontSize: 12, color: '#718096', marginTop: 4 }}>{sub}</div>}
          {change !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
              {change >= 0
                ? <ArrowUpRight size={14} color="#00C896" />
                : <ArrowDownRight size={14} color="#EF4444" />}
              <span style={{ fontSize: 12, color: change >= 0 ? '#00C896' : '#EF4444', fontWeight: 600 }}>
                {change >= 0 ? '+' : ''}{change.toFixed(2)} EUT heute
              </span>
            </div>
          )}
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function EnergyFlowCard({ data }) {
  const [live, setLive] = useState(data);
  useEffect(() => {
    const t = setInterval(() => {
      setLive(prev => ({
        ...prev,
        generation: +(prev.generation + (Math.random() - 0.5) * 0.3).toFixed(1),
        consumption: +(prev.consumption + (Math.random() - 0.5) * 0.2).toFixed(1),
      }));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontWeight: 600, color: '#F1F5F9' }}>Energiefluss — Live</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="pulse-dot"></span>
          <span style={{ fontSize: 12, color: '#718096' }}>Live • alle 5s</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: 8, alignItems: 'center' }}>
        {/* PV */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>☀️</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#F59E0B' }}>{live.generation} kW</div>
          <div style={{ fontSize: 11, color: '#718096' }}>Erzeugung</div>
        </div>
        <div style={{ color: '#00C896', fontSize: 20 }}>→</div>
        {/* Battery */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>🔋</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#00C896' }}>{live.batteryLevel}%</div>
          <div style={{ fontSize: 11, color: '#718096' }}>Speicher</div>
          <div className="progress-bar" style={{ marginTop: 6 }}>
            <div className="progress-fill" style={{ width: `${live.batteryLevel}%` }} />
          </div>
        </div>
        <div style={{ color: '#718096', fontSize: 20 }}>↔</div>
        {/* House */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 32 }}>🏠</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: '#E2E8F0' }}>{live.consumption} kW</div>
          <div style={{ fontSize: 11, color: '#718096' }}>Verbrauch</div>
        </div>
      </div>

      <div style={{ marginTop: 20, padding: '12px 16px', background: '#141820', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, color: '#718096' }}>Netzeinspeisung</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#00C896' }}>+{live.gridFeed} kW ↑</div>
      </div>
    </div>
  );
}

function NodeCard({ node }) {
  return (
    <div style={{ background: '#141820', border: '1px solid #1E2535', borderRadius: 10, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 20 }}>{node.icon}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#E2E8F0', marginTop: 4 }}>{node.id}</div>
          <div style={{ fontSize: 11, color: '#718096' }}>{node.name}</div>
        </div>
        <span style={{ background: 'rgba(0,200,150,0.15)', color: '#00C896', padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
          ● Aktiv
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <div>
          <div style={{ fontSize: 11, color: '#718096' }}>Uptime</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#F1F5F9' }}>{node.uptime}%</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: '#718096' }}>EUT heute</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#00C896' }}>+{node.eutDay}</div>
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 8, padding: '10px 14px', fontSize: 13 }}>
        <div style={{ color: '#718096', marginBottom: 4 }}>{label}</div>
        {payload.map(p => (
          <div key={p.dataKey} style={{ color: p.color, fontWeight: 600 }}>{p.name}: {p.value} kW</div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Module1Dashboard() {
  const [txFilter, setTxFilter] = useState('all');

  const filteredTx = txFilter === 'all'
    ? mockTransactions
    : mockTransactions.filter(t => (txFilter === 'in' ? t.amount > 0 : t.amount < 0));

  return (
    <div style={{ padding: '24px 20px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F1F5F9', margin: 0 }}>⚡ Energiekonto</h1>
        <p style={{ fontSize: 13, color: '#718096', marginTop: 4 }}>Layer 1 — Rohstoffe im Blick</p>
      </div>

      {/* Top Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
        <StatCard
          icon={<Zap size={20} color="#F59E0B" />}
          label="EUT Guthaben"
          value={mockEnergyData.eutBalance.toLocaleString('de-AT')}
          unit="EUT"
          change={mockEnergyData.eutChange24h}
          color="#F59E0B"
        />
        <StatCard
          icon={<TrendingUp size={20} color="#00C896" />}
          label="Erzeugung"
          value={mockEnergyData.generation}
          unit="kW"
          sub="Aktuell live"
          color="#00C896"
        />
        <StatCard
          icon={<Battery size={20} color="#7C3AED" />}
          label="Batteriestand"
          value={mockEnergyData.batteryLevel}
          unit="%"
          sub="Storage Unit #3"
          color="#7C3AED"
        />
        <StatCard
          icon={<Star size={20} color="#F59E0B" />}
          label="Loyalty Points"
          value={mockEnergyData.loyaltyPoints.toLocaleString('de-AT')}
          unit="Pts"
          sub="≈ 89.20 EUR Gutscheinwert"
          color="#F59E0B"
        />
      </div>

      {/* Energy Flow + Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 16, marginBottom: 20 }}>
        <EnergyFlowCard data={mockEnergyData} />
        <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontWeight: 600, color: '#F1F5F9' }}>Energieverlauf — 24h</div>
            <button style={{ background: '#2D3748', border: 'none', color: '#E2E8F0', padding: '4px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Download size={12} /> CSV
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={mockEnergyHistory}>
              <defs>
                <linearGradient id="genGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="conGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="hour" tick={{ fill: '#718096', fontSize: 10 }} interval={3} />
              <YAxis tick={{ fill: '#718096', fontSize: 10 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="generation" name="Erzeugung" stroke="#F59E0B" fill="url(#genGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="consumption" name="Verbrauch" stroke="#7C3AED" fill="url(#conGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Nodes */}
      <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20, marginBottom: 20 }}>
        <div style={{ fontWeight: 600, color: '#F1F5F9', marginBottom: 16 }}>Node Performance</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {mockNodes.map(n => <NodeCard key={n.id} node={n} />)}
        </div>
      </div>

      {/* Transactions */}
      <div style={{ background: '#1A1F2E', border: '1px solid #2D3748', borderRadius: 12, padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontWeight: 600, color: '#F1F5F9' }}>Transaktionshistorie EUT</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['all', 'in', 'out'].map(f => (
              <button
                key={f}
                onClick={() => setTxFilter(f)}
                style={{
                  background: txFilter === f ? '#00C896' : '#2D3748',
                  color: txFilter === f ? '#fff' : '#E2E8F0',
                  border: 'none', padding: '4px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600
                }}>
                {f === 'all' ? 'Alle' : f === 'in' ? '+ Eingang' : '− Ausgang'}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredTx.map(tx => (
            <div key={tx.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 0', borderBottom: '1px solid #1E2535'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: '#141820', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
                  {tx.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#E2E8F0' }}>{tx.type}</div>
                  <div style={{ fontSize: 12, color: '#718096', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={10} /> {tx.date}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: tx.amount >= 0 ? '#00C896' : '#EF4444' }}>
                {tx.amount >= 0 ? '+' : ''}{tx.amount.toFixed(2)} EUT
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
