const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

// Rutas generales del inventario
router.get('/', inventarioController.getAll);
router.get('/search', inventarioController.search);
router.get('/bajo-stock', inventarioController.getBajoStock);
router.get('/movimientos', inventarioController.getAllMovimientos);
router.get('/categoria/:categoria', inventarioController.getByCategoria);
router.get('/:id', inventarioController.getById);
router.get('/:id/movimientos', inventarioController.getMovimientos);
router.post('/', inventarioController.create);
router.put('/:id', inventarioController.update);
router.patch('/:id/stock', inventarioController.updateStock);
router.delete('/:id', inventarioController.delete);

module.exports = router;