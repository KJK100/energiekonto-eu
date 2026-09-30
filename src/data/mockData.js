export const mockUser = {
  name: 'Klaus Kohlmayr',
  wallet: '0x4A8c...3F2e',
  avatar: 'KK',
};

export const mockEnergyData = {
  generation: 8.4,
  consumption: 3.2,
  gridFeed: 5.2,
  batteryLevel: 78,
  eutBalance: 12450.80,
  eutChange24h: +340.50,
  loyaltyPoints: 8920,
};

export const mockEnergyHistory = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  generation: +(Math.random() * 10 + 2).toFixed(1),
  consumption: +(Math.random() * 4 + 1).toFixed(1),
}));

export const mockTransactions = [
  { id: 1, type: 'Energieverkauf', amount: +120.50, eutAmount: +120.50, date: '2026-06-18 14:32', icon: '⚡' },
  { id: 2, type: 'Speax Credits', amount: -50.00, eutAmount: -50.00, date: '2026-06-18 12:10', icon: '🤖' },
  { id: 3, type: 'Loyalty Bonus', amount: +25.00, eutAmount: +25.00, date: '2026-06-18 08:00', icon: '⭐' },
  { id: 4, type: 'Bonus Galaxy', amount: -80.00, eutAmount: -80.00, date: '2026-06-17 19:45', icon: '🎁' },
  { id: 5, type: 'Regelenergie', amount: +340.00, eutAmount: +340.00, date: '2026-06-17 06:00', icon: '🔋' },
  { id: 6, type: 'ChargePoint', amount: -15.30, eutAmount: -15.30, date: '2026-06-16 20:20', icon: '🔌' },
  { id: 7, type: 'AI-Service-Fee', amount: +88.00, eutAmount: +88.00, date: '2026-06-16 14:00', icon: '💻' },
];

export const mockNodes = [
  { id: 'PGU', name: 'Power Generation Unit', icon: '⚡', color: '#F59E0B', kw: 8.4, uptime: 99.2, eutDay: 120.5, status: 'active' },
  { id: 'STU', name: 'Storage Unit', icon: '🔋', color: '#00C896', kw: 5.2, uptime: 98.7, eutDay: 85.3, status: 'active', batteryPct: 78 },
  { id: 'DCU', name: 'Datacenter Computing Unit', icon: '🖥️', color: '#7C3AED', kw: 12.1, uptime: 99.8, eutDay: 340.0, status: 'active' },
  { id: 'AAU', name: 'AI Agent Unit', icon: '🤖', color: '#EC4899', kw: null, uptime: 99.9, eutDay: 210.5, status: 'active' },
];

export const mockTransformers = [
  { id: 1, type: 'PGU', name: 'Power Generation Unit #3', icon: '⚡', color: '#F59E0B', priceEUT: 2100, priceEUR: 2000, available: 12, yieldPA: 8.4, kwhOutput: 38400 },
  { id: 2, type: 'STU', name: 'Storage Unit #7', icon: '🔋', color: '#00C896', priceEUT: 2250, priceEUR: 2000, available: 5, yieldPA: 9.2, kwhOutput: 0 },
  { id: 3, type: 'DCU', name: 'Datacenter Computing Unit #2', icon: '🖥️', color: '#7C3AED', priceEUT: 1980, priceEUR: 2000, available: 8, yieldPA: 12.1, kwhOutput: 0 },
  { id: 4, type: 'AAU', name: 'AI Agent Unit #1', icon: '🤖', color: '#EC4899', priceEUT: 2340, priceEUR: 2000, available: 3, yieldPA: 14.5, kwhOutput: 0 },
  { id: 5, type: 'PGU', name: 'Power Generation Unit #8', icon: '⚡', color: '#F59E0B', priceEUT: 2050, priceEUR: 2000, available: 20, yieldPA: 7.9, kwhOutput: 36000 },
  { id: 6, type: 'DCU', name: 'Datacenter Computing Unit #5', icon: '🖥️', color: '#7C3AED', priceEUT: 2100, priceEUR: 2000, available: 2, yieldPA: 11.8, kwhOutput: 0 },
];

export const mockPortfolio = [
  { id: 1, type: 'PGU', name: 'Power Generation Unit #1', icon: '⚡', color: '#F59E0B', quantity: 5, buyPrice: 2000, currentPrice: 2100, eutDistributed: 1240, unrealizedPnl: +500 },
  { id: 2, type: 'DCU', name: 'Datacenter Computing Unit #1', icon: '🖥️', color: '#7C3AED', quantity: 2, buyPrice: 1900, currentPrice: 1980, eutDistributed: 680, unrealizedPnl: +160 },
  { id: 3, type: 'STU', name: 'Storage Unit #3', icon: '🔋', color: '#00C896', quantity: 3, buyPrice: 2100, currentPrice: 2250, eutDistributed: 855, unrealizedPnl: +450 },
];

export const mockAIWallet = {
  speaxCredits: 145,
  speaxExpiry: '2026-08-31',
  graisCredits: 280,
  graisExpiry: '2026-09-30',
};

export const mockSpeaxPackages = [
  { id: 'free', name: 'Free', credits: 10, priceEUT: 0, priceEUR: 0, badge: null },
  { id: 'basic', name: 'Basic', credits: 100, priceEUT: 50, priceEUR: 49, badge: null },
  { id: 'pro', name: 'Pro', credits: 500, priceEUT: 220, priceEUR: 199, badge: 'Beliebt' },
  { id: 'max', name: 'Max', credits: 2000, priceEUT: 800, priceEUR: 749, badge: 'Best Value' },
];

export const mockGraisPackages = [
  { id: 'starter', name: 'Starter', credits: 50, priceEUT: 25, priceEUR: 24 },
  { id: 'pro', name: 'Pro', credits: 300, priceEUT: 130, priceEUR: 119, badge: 'Beliebt' },
  { id: 'business', name: 'Business', credits: 1000, priceEUT: 400, priceEUR: 369, badge: 'Best Value' },
];

export const mockTaskLog = [
  { id: 'T-001', type: 'Marktanalyse', ts: '2026-06-18 13:45', credits: 12, status: 'completed' },
  { id: 'T-002', type: 'Code-Review', ts: '2026-06-18 11:20', credits: 8, status: 'completed' },
  { id: 'T-003', type: 'Report PDF', ts: '2026-06-18 09:05', credits: 25, status: 'active', progress: 65 },
  { id: 'T-004', type: 'Datenextraktion', ts: '2026-06-17 22:30', credits: 5, status: 'completed' },
  { id: 'T-005', type: 'Email-Kampagne', ts: '2026-06-17 16:00', credits: 18, status: 'failed' },
];

export const mockVouchers = [
  { id: 1, brand: 'Amazon', category: 'Shopping', value: 50, priceEUT: 55, priceLoyalty: 5000, logo: '📦', color: '#FF9900' },
  { id: 2, brand: 'REWE', category: 'Gastronomie', value: 25, priceEUT: 27, priceLoyalty: 2500, logo: '🛒', color: '#CC0000' },
  { id: 3, brand: 'Booking.com', category: 'Reise', value: 100, priceEUT: 108, priceLoyalty: 10000, logo: '✈️', color: '#003580' },
  { id: 4, brand: 'Decathlon', category: 'Erlebnis', value: 40, priceEUT: 43, priceLoyalty: 4000, logo: '⚽', color: '#0082C3' },
  { id: 5, brand: 'MediaMarkt', category: 'Shopping', value: 75, priceEUT: 81, priceLoyalty: 7500, logo: '📱', color: '#CC0000' },
  { id: 6, brand: 'Airbnb', category: 'Reise', value: 80, priceEUT: 86, priceLoyalty: 8000, logo: '🏠', color: '#FF5A5F' },
  { id: 7, brand: 'Zalando', category: 'Shopping', value: 30, priceEUT: 32, priceLoyalty: 3000, logo: '👟', color: '#FF6900' },
  { id: 8, brand: 'Wiener Prater', category: 'Erlebnis', value: 20, priceEUT: 22, priceLoyalty: 2000, logo: '🎡', color: '#16A34A' },
];

export const mockSalzburgAGOffers = [
  {
    id: 'sag-1',
    title: 'Ökostrom Wechselbonus',
    description: 'Wechsle jetzt zu Salzburg AG Ökostrom und erhalte 100 EUT Gutschrift auf dein Energiekonto.',
    cta: 'Jetzt wechseln',
    badge: 'Exklusiv für IoE-Nutzer',
    highlight: '100 EUT Bonus',
    color: '#E30613',
    tag: 'Energie-Partner',
  },
  {
    id: 'sag-2',
    title: 'PV-Anlage Finanzierung',
    description: 'Salzburg AG finanziert deine neue PV-Anlage ab 0,99% p.a. — direkte Verknüpfung mit deinem IoE Node.',
    cta: 'Angebot anfordern',
    badge: 'Sonderkonditionen',
    highlight: 'Ab 0,99% Finanzierung',
    color: '#E30613',
    tag: 'Solar & Speicher',
  },
  {
    id: 'sag-3',
    title: 'E-Mobilität Kombipaket',
    description: 'Salzburg AG Wallbox + ChargePoint-Integration + 50 EUT Startguthaben. Alles aus einer Hand.',
    cta: 'Paket entdecken',
    badge: 'Neu',
    highlight: '50 EUT Startguthaben',
    color: '#E30613',
    tag: 'E-Mobilität',
  },
];

export const mockGutscheinAtVouchers = [
  { id: 'gat-1', brand: 'Intersport', category: 'Sport', value: 50, priceEUT: 52, priceLoyalty: 5000, logo: '🏃', color: '#FF6B00', source: 'gutschein.at' },
  { id: 'gat-2', brand: 'Douglas', category: 'Beauty', value: 30, priceEUT: 31, priceLoyalty: 3000, logo: '💄', color: '#9B1B30', source: 'gutschein.at' },
  { id: 'gat-3', brand: 'XXXLutz', category: 'Wohnen', value: 100, priceEUT: 105, priceLoyalty: 10000, logo: '🛋️', color: '#CC0000', source: 'gutschein.at' },
  { id: 'gat-4', brand: 'Wienerwald', category: 'Gastronomie', value: 20, priceEUT: 21, priceLoyalty: 2000, logo: '🍗', color: '#E8A000', source: 'gutschein.at' },
  { id: 'gat-5', brand: 'Libro', category: 'Shopping', value: 25, priceEUT: 26, priceLoyalty: 2500, logo: '📚', color: '#1565C0', source: 'gutschein.at' },
  { id: 'gat-6', brand: 'Thermen Amadé', category: 'Erlebnis', value: 40, priceEUT: 43, priceLoyalty: 4000, logo: '🌊', color: '#006994', source: 'gutschein.at' },
  { id: 'gat-7', brand: 'Humanic', category: 'Shopping', value: 35, priceEUT: 37, priceLoyalty: 3500, logo: '👠', color: '#8B1A1A', source: 'gutschein.at' },
  { id: 'gat-8', brand: 'Stadthalle Graz', category: 'Erlebnis', value: 60, priceEUT: 64, priceLoyalty: 6000, logo: '🎭', color: '#4A148C', source: 'gutschein.at' },
];

export const mockOwnedVouchers = [
  { id: 101, brand: 'Amazon', value: 50, status: 'active', code: 'AMZ-4X9K-EUT1', expires: '2026-12-31', remaining: 50 },
  { id: 102, brand: 'Booking.com', value: 100, status: 'active', code: 'BKG-8Y2M-IOE3', expires: '2026-09-30', remaining: 60 },
  { id: 103, brand: 'REWE', value: 25, status: 'redeemed', code: 'REW-3Z7N-EUT5', expires: '2026-06-01', remaining: 0 },
];
