module.exports = (err, req, res, next) => {
  // Se o erro já tiver status, usa, senão default 500
  const statusCode = err.status || 500;

  // Mensagem de erro
  const message = err.message || 'Algo deu errado no servidor';

  // Log detalhado para dev
  if (process.env.NODE_ENV !== 'production') {
    console.error('Erro:', err);
  }

  // Retorno para o cliente
  res.status(statusCode).json({
    success: false,
    message,
  });
};
