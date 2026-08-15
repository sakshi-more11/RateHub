const { z } = require('zod');

const createUserSchema = z.object({
  name: z.string().min(20).max(60),
  email: z.string().email(),
  address: z.string().max(400),
  password: z.string().min(8).max(16)
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain a special character'),
  role: z.enum(['ADMIN', 'NORMAL_USER', 'STORE_OWNER']),
});

const createStoreSchema = z.object({
  name: z.string().min(20).max(60),
  email: z.string().email(),
  address: z.string().max(400),
  ownerId: z.number().int().optional(),
});

const submitRatingSchema = z.object({
  storeId: z.number().int(),
  value: z.number().int().min(1).max(5),
});

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(16)
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Must contain a special character'),
});

module.exports = { createUserSchema, createStoreSchema, submitRatingSchema, updatePasswordSchema };