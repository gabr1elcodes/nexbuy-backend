const { Router } = require('express');
const orderRoutes = require ('./modules/orders/order.routes');
const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const productRoutes = require('./modules/products/product.routes');
const routes = Router();

/**
 * ======================
 * ROTAS DA APLICAÇÃO
 * ======================
 */

routes.use('/auth', authRoutes);
routes.use('/users', userRoutes);
routes.use('/products', productRoutes);
routes.use('/orders', orderRoutes);

module.exports = routes;
