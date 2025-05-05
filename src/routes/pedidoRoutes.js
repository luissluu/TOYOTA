const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware');

// Todas las rutas requieren autenticación y roles específicos
router.get('/', authMiddleware, checkRole(['administrador', 'mecanico']), pedidoController.getAll);
router.get('/:id', authMiddleware, checkRole(['administrador', 'mecanico']), pedidoController.getById);
router.post('/', authMiddleware, checkRole(['administrador']), pedidoController.create);
router.put('/:id', authMiddleware, checkRole(['administrador']), pedidoController.update);
router.put('/:id/recibir', authMiddleware, checkRole(['administrador', 'mecanico']), pedidoController.recibirPedido);
router.delete('/:id', authMiddleware, checkRole(['administrador']), pedidoController.delete);

// Rutas para detalles de pedidos
router.post('/:id/detalles', authMiddleware, checkRole(['administrador']), pedidoController.addDetalle);
router.put('/detalles/:detalleId', authMiddleware, checkRole(['administrador']), pedidoController.updateDetalle);
router.delete('/detalles/:detalleId', authMiddleware, checkRole(['administrador']), pedidoController.deleteDetalle);

module.exports = router;