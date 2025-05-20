const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware');

// Rutas protegidas con autenticación
router.get('/', authMiddleware, vehiculoController.getAll);
router.get('/:id', authMiddleware, vehiculoController.getById);
router.get('/vin/:vin', authMiddleware, vehiculoController.getByVin);

// Rutas protegidas con autenticación y verificación de roles
router.post('/', authMiddleware, checkRole(['administrador', 'mecanico', 'cliente']), vehiculoController.create);
router.put('/:id', authMiddleware, checkRole(['administrador', 'mecanico']), vehiculoController.update);
router.delete('/:id', authMiddleware, checkRole(['administrador']), vehiculoController.delete);

module.exports = router;