const Product = require('./product.model');
const { createProductSchema, updateProductSchema } = require('../../validators/productValidator');

// ---------------------- LISTAR TODOS OS PRODUTOS ----------------------
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// ---------------------- BUSCAR PRODUTO POR ID ----------------------
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// ---------------------- CRIAR PRODUTO ----------------------
const createProduct = async (req, res, next) => {
  try {
    const parsed = createProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: parsed.error.errors.map(e => ({ path: e.path.join('.'), message: e.message })),
      });
    }

    const productData = parsed.data;

    // ATUALIZADO: Salva apenas o nome do arquivo para evitar conflito de barras
    if (req.file) {
      productData.image = req.file.filename;
    }

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// ---------------------- ATUALIZAR PRODUTO ----------------------
const updateProduct = async (req, res, next) => {
  try {
    const parsed = updateProductSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: parsed.error.errors.map(e => ({ path: e.path.join('.'), message: e.message })),
      });
    }

    const { id } = req.params;
    const updateData = parsed.data;

    // ATUALIZADO: Salva apenas o nome do arquivo
    if (req.file) {
      productData.image = req.file.originalname; // Salva o nome real
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Produto não encontrado' });

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// ---------------------- DELETAR PRODUTO ----------------------
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};