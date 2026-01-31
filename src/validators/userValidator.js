const { z } = require('zod');

const updateUserSchema = z.object({
  name: z.string().min(2, 'Nome muito curto').optional(),
  email: z.string().email('Email inválido').optional(),
  role: z.enum(['user', 'admin']).optional(),
});

module.exports = {
  updateUserSchema,
};
