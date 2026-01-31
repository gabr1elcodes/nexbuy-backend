const Order = require('./order.model');
const Product = require('../products/product.model');
const { z } = require('zod');

// ---------------------- SCHEMA DE VALIDAÇÃO ----------------------
const orderItemSchema = z.object({
  product: z.string().min(1),
  quantity: z.number().int().positive(),
});

const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1),
});

// ---------------------- CRIAR PEDIDO ----------------------
const createOrder = async (req, res, next) => {
  try {
    const parsed = createOrderSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: parsed.error.issues.map(err => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      });
    }

    const { items } = parsed.data;
    const userId = req.user.id;

    const productIds = items.map(item => item.product);

    const products = await Product.find({
      _id: { $in: productIds },
    });

    if (products.length !== productIds.length) {
      return res.status(400).json({
        success: false,
        message: 'Um ou mais produtos não existem',
      });
    }

    let total = 0;

    for (const item of items) {
      const product = products.find(
        p => p._id.toString() === item.product
      );

      total += product.price * item.quantity;
    }

    const order = await Order.create({
      user: userId,
      items,
      total,
    });

    return res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// ---------------------- LISTAR PEDIDOS DO USUÁRIO ----------------------
const getMyOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId })
      .populate('items.product')
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};
