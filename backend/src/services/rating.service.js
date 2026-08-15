const prisma = require('../config/db');

async function submitOrUpdateRating(userId, storeId, value) {
  const store = await prisma.store.findUnique({ where: { id: storeId } });
  if (!store) throw new Error('Store not found');

  const rating = await prisma.rating.upsert({
    where: { userId_storeId: { userId, storeId } },
    update: { value },
    create: { userId, storeId, value },
  });
  return rating;
}
async function deleteRating(userId, storeId) {
  await prisma.rating.delete({
    where: { userId_storeId: { userId, storeId } },
  });
}

module.exports = { submitOrUpdateRating, deleteRating };
