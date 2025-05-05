const express = require('express');
const router = express.Router();
const ordenServicioController = require('../controllers/ordenServicioController');

// Rutas principales de órdenes
router.get('/', ordenServicioController.getAll);
router.get('/usuario/:usuarioId', ordenServicioController.getByUsuario);
router.get('/:id', ordenServicioController.getById);
router.post('/', ordenServicioController.create);
router.put('/:id', ordenServicioController.update);
router.put('/:id/finalizar', ordenServicioController.finalizar);
router.delete('/:id', ordenServicioController.delete);

// Rutas para detalles de órdenes
router.post('/:id/detalles', ordenServicioController.addDetalle);
router.put('/detalles/:detalleId', ordenServicioController.updateDetalle);
router.delete('/detalles/:detalleId', ordenServicioController.deleteDetalle);

module.exports = router;