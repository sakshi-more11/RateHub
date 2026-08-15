const { z } = require('zod');

const signupSchema = z.object({
  name: z.string()
    .min(20, 'Name must be at least 20 characters')
    .max(60, 'Name must be at most 60 characters'),
  email: z.string().email('Invalid email format'),
  address: z.string().max(400, 'Address must be at most 400 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

module.exports = { signupSchema, loginSchema };