const { Router } = require('express');
const router = Router();
const { createOrder, getMyOrders } = require('./order.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

// Criar pedido (usuário logado)
router.post('/', authMiddleware, createOrder);

// Listar pedidos do usuário logado
router.get('/my', authMiddleware, getMyOrders);

module.exports = router;
