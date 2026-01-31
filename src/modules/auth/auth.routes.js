const { Router } = require('express');
const {
  register,
  login,
  forgotPassword,
  googleLogin,
} = require('./auth.controller');

const authMiddleware = require('../../middlewares/auth.middleware');

const router = Router();

// Rotas públicas
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/google', googleLogin);

// Rota protegida
router.get('/perfil', authMiddleware, (req, res) => {
  res.json({
    message: `Bem-vindo, ${req.user.name}!`,
    user: req.user,
  });
});

module.exports = router;
