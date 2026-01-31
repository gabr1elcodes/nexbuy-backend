const { Router } = require('express');
const router = Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMe,
} = require('./user.controller');

const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role');
const allowSelfOrAdmin = require('../../middlewares/allowSelfOrAdmin');

// ==============================
// Usuário logado
// ==============================
router.get(
  '/me',
  authMiddleware,
  getMe
);

// ==============================
// Listar todos os usuários (ADMIN)
// ==============================
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['admin']),
  getAllUsers
);

// ==============================
// Buscar usuário por ID (ADMIN ou o próprio usuário)
// ==============================
router.get(
  '/:id',
  authMiddleware,
  allowSelfOrAdmin,
  getUserById
);

// ==============================
// Atualizar usuário (ADMIN)
// ==============================
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  updateUser
);

// ==============================
// Deletar usuário (ADMIN)
// ==============================
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  deleteUser
);

module.exports = router;
