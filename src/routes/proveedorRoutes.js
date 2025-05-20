const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware');

// Todas las rutas requieren autenticación
router.get('/', authMiddleware, proveedorController.getAll);
router.get('/search', authMiddleware, proveedorController.search);
router.get('/:id', authMiddleware, proveedorController.getById);
router.post('/', authMiddleware, checkRole(['administrador']), proveedorController.create);
router.put('/:id', authMiddleware, checkRole(['administrador']), proveedorController.update);
router.delete('/:id', authMiddleware, checkRole(['administrador']), proveedorController.delete);

module.exports = router;