const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hash = async (pw) => await bcrypt.hash(pw, 10);

  await prisma.user.upsert({
    where: { email: 'admin@ratehub.com' },
    update: {},
    create: {
      name: 'System Administrator Account RateHub',
      email: 'admin@ratehub.com',
      address: 'Admin HQ, Pune, Maharashtra',
      password: await hash('Admin@123'),
      role: 'ADMIN',
    },
  });

  const owner = await prisma.user.upsert({
    where: { email: 'owner@ratehub.com' },
    update: {},
    create: {
      name: 'Store Owner Test Account RateHub',
      email: 'owner@ratehub.com',
      address: '12 Koregaon Park, Pune',
      password: await hash('Owner@123'),
      role: 'STORE_OWNER',
    },
  });

  const store = await prisma.store.upsert({
    where: { email: 'starbucks@ratehub.com' },
    update: {},
    create: {
      name: 'Starbucks Coffee FC Road Branch',
      email: 'starbucks@ratehub.com',
      address: 'FC Road, Pune, Maharashtra',
      ownerId: owner.id,
    },
  });

  const store2 = await prisma.store.upsert({
    where: { email: 'dominos@ratehub.com' },
    update: {},
    create: { name: 'Dominos Pizza Camp Branch Pune', email: 'dominos@ratehub.com', address: 'Camp, Pune, Maharashtra' },
  });

  const store3 = await prisma.store.upsert({
    where: { email: 'bigbazaar@ratehub.com' },
    update: {},
    create: { name: 'Big Bazaar Hypermarket Aundh', email: 'bigbazaar@ratehub.com', address: 'Aundh, Pune, Maharashtra' },
  });

  const store4 = await prisma.store.upsert({
    where: { email: 'smartstore@ratehub.com' },
    update: {},
    create: { name: 'Reliance SMART Superstore', email: 'smartstore@ratehub.com', address: 'Radhika road, Satara, Maharashtra' },
  });

  const raterData = [
    { name: 'Priya Deshmukh Regular Customer RateHub', email: 'priya@ratehub.com' },
    { name: 'Aman Verma Frequent Visitor RateHub', email: 'aman@ratehub.com' },
    { name: 'Sneha Kulkarni Coffee Lover RateHub', email: 'sneha@ratehub.com' },
    { name: 'Rohit Patil Weekend Shopper RateHub', email: 'rohit@ratehub.com' },
    { name: 'Normal Test User Account RateHub', email: 'user@ratehub.com' },
  ];

  const raters = [];
  for (const r of raterData) {
    const u = await prisma.user.upsert({
      where: { email: r.email },
      update: {},
      create: {
        name: r.name,
        email: r.email,
        address: 'Pune, Maharashtra',
        password: await hash('User@123'),
        role: 'NORMAL_USER',
      },
    });
    raters.push(u);
  }

  // Starbucks (owner's store): multiple ratings across months, for rich analytics charts
  const starbucksRatings = [
    { rater: raters[4], value: 5, date: '2026-03-10' },
    { rater: raters[0], value: 4, date: '2026-03-22' },
    { rater: raters[1], value: 5, date: '2026-04-15' },
    { rater: raters[2], value: 3, date: '2026-05-05' },
    { rater: raters[3], value: 4, date: '2026-05-28' },
    { rater: raters[0], value: 5, date: '2026-06-12' },
    { rater: raters[1], value: 4, date: '2026-07-01' },
    { rater: raters[2], value: 5, date: '2026-07-20' },
    { rater: raters[3], value: 2, date: '2026-08-02' },
    { rater: raters[4], value: 5, date: '2026-08-10' },
  ];
  for (const r of starbucksRatings) {
    await prisma.rating.upsert({
      where: { userId_storeId: { userId: r.rater.id, storeId: store.id } },
      update: { value: r.value, createdAt: new Date(r.date) },
      create: { userId: r.rater.id, storeId: store.id, value: r.value, createdAt: new Date(r.date) },
    });
  }

  // Other stores: exactly 1 rating each = clean whole-number averages
  await prisma.rating.upsert({
    where: { userId_storeId: { userId: raters[4].id, storeId: store2.id } },
    update: { value: 4 },
    create: { userId: raters[4].id, storeId: store2.id, value: 4, createdAt: new Date('2026-06-01') },
  });
  await prisma.rating.upsert({
    where: { userId_storeId: { userId: raters[0].id, storeId: store3.id } },
    update: { value: 3 },
    create: { userId: raters[0].id, storeId: store3.id, value: 3, createdAt: new Date('2026-07-15') },
  });
  // Reliance intentionally left with 0 ratings — demonstrates the "no ratings yet" empty state

  console.log('Seed complete.');
  console.log('Admin: admin@ratehub.com / Admin@123');
  console.log('Owner: owner@ratehub.com / Owner@123');
  console.log('Normal user: user@ratehub.com / User@123 (plus priya/aman/sneha/rohit@ratehub.com, same password)');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());