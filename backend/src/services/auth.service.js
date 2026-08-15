const prisma = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

async function signup({ name, email, address, password }) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      address,
      password: hashedPassword,
      role: 'NORMAL_USER',
    },
  });

  const token = generateToken({ id: user.id, role: user.role });

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}

async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken({ id: user.id, role: user.role });

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}

module.exports = { signup, login };