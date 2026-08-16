const prisma = require('../config/db');

function calcAvg(ratings) {
  if (!ratings.length) return 0;
  const avg = ratings.reduce((s, r) => s + r.value, 0) / ratings.length;
  return Math.round(avg); // whole number, no decimals
}

async function createStore({ name, email, address, ownerId }) {
  return prisma.store.create({
    data: { name, email, address, ...(ownerId && { ownerId }) },
  });
}

async function listStoresAdmin({ name, email, address, sortBy = 'name', sortOrder = 'asc' }) {
  const where = {
    ...(name && { name: { contains: name } }),
    ...(email && { email: { contains: email } }),
    ...(address && { address: { contains: address } }),
  };

  const isComputedSort = sortBy === 'rating';

  const stores = await prisma.store.findMany({
    where,
    ...(isComputedSort ? {} : { orderBy: { [sortBy]: sortOrder } }),
    include: { ratings: { select: { value: true } } },
  });

  let result = stores.map(s => ({
    id: s.id, name: s.name, email: s.email, address: s.address,
    rating: calcAvg(s.ratings),
    ratingCount: s.ratings.length,
  }));

  if (isComputedSort) {
    result = result.sort((a, b) => sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating);
  }

  return result;
}

async function listStoresForUser({ name, address, sortBy = 'name', sortOrder = 'asc', userId }) {
  const where = {
    ...(name && { name: { contains: name } }),
    ...(address && { address: { contains: address } }),
  };
  const stores = await prisma.store.findMany({
    where,
    orderBy: { [sortBy]: sortOrder },
    include: { ratings: true },
  });
  return stores.map(s => {
    const userRating = s.ratings.find(r => r.userId === userId);
    return {
      id: s.id, name: s.name, address: s.address,
      overallRating: calcAvg(s.ratings),
      userRating: userRating ? userRating.value : null,
    };
  });
}

async function getTopRatedStores(limit = 5) {
  const stores = await prisma.store.findMany({ include: { ratings: { select: { value: true } } } });
  return stores
    .map(s => ({ id: s.id, name: s.name, rating: calcAvg(s.ratings) }))
    .filter(s => s.rating > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

module.exports = { createStore, listStoresAdmin, listStoresForUser, getTopRatedStores };