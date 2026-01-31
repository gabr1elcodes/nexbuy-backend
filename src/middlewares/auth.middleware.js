const jwt = require('jsonwebtoken');

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido no arquivo .env');
}

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o header Authorization existe
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Token não fornecido',
    });
  }

  // Espera o formato: Bearer <token>
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({
      success: false,
      message: 'Formato de token inválido',
    });
  }

  try {
    // Valida e decodifica o token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Injeta os dados do usuário na request
    req.user = {
      id: decoded.userId,
      name: decoded.name,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Erro JWT:', error.message);
    }

    return res.status(401).json({
      success: false,
      message: 'Token inválido ou expirado',
    });
  }
};

module.exports = authMiddleware;
