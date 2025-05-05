const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware');

// Rutas para servicios con autenticación
router.get('/', authMiddleware, servicioController.getAll);
router.get('/categoria/:categoria', authMiddleware, servicioController.getByCategoria);
router.get('/:id', authMiddleware, servicioController.getById);

// Rutas que requieren rol administrador
router.post('/', authMiddleware, checkRole(['administrador']), servicioController.create);
router.put('/:id', authMiddleware, checkRole(['administrador']), servicioController.update);
router.delete('/:id', authMiddleware, checkRole(['administrador']), servicioController.delete);

module.exports = router;