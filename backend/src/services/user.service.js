const prisma = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/hash');

async function createUser({ name, email, address, password, role }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('Email already registered');
  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: { name, email, address, password: hashedPassword, role },
    select: { id: true, name: true, email: true, address: true, role: true },
  });
}

async function listUsers({ name, email, address, role, sortBy = 'name', sortOrder = 'asc' }) {
  const where = {
    ...(name && { name: { contains: name } }),
    ...(email && { email: { contains: email } }),
    ...(address && { address: { contains: address } }),
    ...(role && { role }),
  };
  const users = await prisma.user.findMany({
    where,
    orderBy: { [sortBy]: sortOrder },
    select: { id: true, name: true, email: true, address: true, role: true },
  });
  return users;
}

async function getUserDetail(id) {
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    select: {
      id: true, name: true, email: true, address: true, role: true,
      ownedStore: { select: { id: true, name: true, ratings: { select: { value: true } } } },
    },
  });
  if (!user) throw new Error('User not found');

  let result = { ...user };
  if (user.role === 'STORE_OWNER' && user.ownedStore) {
    const ratings = user.ownedStore.ratings;
    const avg = ratings.length ? ratings.reduce((s, r) => s + r.value, 0) / ratings.length : 0;
    result.storeRating = Number(avg.toFixed(2));
  }
  delete result.ownedStore;
  return result;
}

async function updatePassword(userId, currentPassword, newPassword) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const isValid = await comparePassword(currentPassword, user.password);
  if (!isValid) throw new Error('Current password is incorrect');
  const hashedPassword = await hashPassword(newPassword);
  await prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });
  return { message: 'Password updated successfully' };
}

module.exports = { createUser, listUsers, getUserDetail, updatePassword };