const { z } = require('zod');

const toNumber = (val) => {
  const parsed = parseFloat(val);
  return isNaN(parsed) ? val : parsed;
};

const createProductSchema = z.object({
  name: z.string().min(1, "Nome do produto é obrigatório"),
  price: z.preprocess(toNumber, z.number().positive("Preço deve ser maior que 0")),
  oldPrice: z.preprocess(toNumber, z.number().nonnegative().optional()), 
  stock: z.preprocess(toNumber, z.number().int().nonnegative("Estoque não pode ser negativo")),
  description: z.string().optional().nullable(),
});

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  price: z.preprocess(toNumber, z.number().positive().optional()),
  oldPrice: z.preprocess(toNumber, z.number().nonnegative().optional().nullable()),
  stock: z.preprocess(toNumber, z.number().int().nonnegative().optional()),
  description: z.string().optional().nullable(),
});

module.exports = { 
  createProductSchema,
  updateProductSchema 
};