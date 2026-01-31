const { Router } = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = Router();

const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct,} = require('./product.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role');

// ---------------------- CONFIGURAR MULTER ----------------------
const uploadDir = path.join(__dirname, '../../uploads');

// Criar pasta se não existir
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// ---------------------- MIDDLEWARE PARA VALIDAR ID ----------------------
const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  next();
};

// ---------------------- ROTAS PÚBLICAS ----------------------
router.get('/', getAllProducts);

router.get('/:id', validateObjectId, getProductById);

// ---------------------- ROTAS PROTEGIDAS (ADMIN) ----------------------

router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin']),
  upload.single('image'),
  createProduct
);

router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  validateObjectId,
  upload.single('image'),
  updateProduct
);

router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  validateObjectId,
  deleteProduct
);

module.exports = router;
