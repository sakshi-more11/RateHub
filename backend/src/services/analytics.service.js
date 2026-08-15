const prisma = require('../config/db');

async function getAdminDashboardStats() {
  const [totalUsers, totalStores, totalRatings] = await Promise.all([
    prisma.user.count(),
    prisma.store.count(),
    prisma.rating.count(),
  ]);
  return { totalUsers, totalStores, totalRatings };
}

async function getStoreOwnerDashboard(storeId) {
  const store = await prisma.store.findUnique({ where: { id: storeId }, select: { name: true, address: true } });
  const ratings = await prisma.rating.findMany({
    where: { storeId },
    include: { user: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: 'desc' },
  });

  const totalRatings = ratings.length;
  const avgRating = totalRatings
    ? Math.round((ratings.reduce((s, r) => s + r.value, 0) / totalRatings) * 10) / 10
    : 0;

  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ratings.forEach(r => { distribution[r.value]++; });

  const trendMap = {};
  ratings.forEach(r => {
    const month = r.createdAt.toISOString().slice(0, 7); // "2026-08"
    if (!trendMap[month]) trendMap[month] = { sum: 0, count: 0 };
    trendMap[month].sum += r.value;
    trendMap[month].count += 1;
  });
  const trend = Object.entries(trendMap)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, { sum, count }]) => ({ month, avgRating: Math.round((sum / count) * 10) / 10 }));

  const raters = ratings.map(r => ({
    userId: r.user.id, name: r.user.name, email: r.user.email, rating: r.value,
  }));

  return { storeName: store.name, storeAddress: store.address, avgRating, totalRatings, distribution, trend, raters };
}

module.exports = { getAdminDashboardStats, getStoreOwnerDashboard };