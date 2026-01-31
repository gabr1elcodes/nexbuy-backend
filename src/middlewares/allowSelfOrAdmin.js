const allowSelfOrAdmin = (req, res, next) => {
  const userIdFromToken = req.user.id;
  const userIdFromParams = req.params.id;

  // Admin pode acessar qualquer usuário
  // Usuário comum só pode acessar o próprio ID
  if (
    req.user.role === 'admin' ||
    userIdFromToken === userIdFromParams
  ) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Acesso negado',
  });
};

module.exports = allowSelfOrAdmin;
