const User = require('./user.model');
const { userUpdateSchema } = require('../../validators/userValidator');

// ---------------------- LISTAR TODOS OS USUÁRIOS ----------------------
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password'); // nunca retornar senha
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// ---------------------- BUSCAR USUÁRIO POR ID ----------------------
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// ---------------------- ATUALIZAR USUÁRIO ----------------------
const updateUser = async (req, res, next) => {
  try {
    // Validação dos dados recebidos
    const parsed = userUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: parsed.error.errors.map(e => ({ path: e.path.join('.'), message: e.message })),
      });
    }

    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, parsed.data, { new: true }).select('-password');
    if (!updatedUser) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// ---------------------- DELETAR USUÁRIO ----------------------
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    next(error);
  }
};


const getMe = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMe,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

