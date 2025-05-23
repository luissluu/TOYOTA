const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticasController');

router.get('/clientes', estadisticasController.totalClientes);
router.get('/completados', estadisticasController.serviciosCompletados);
router.get('/populares', estadisticasController.serviciosPopulares);
router.get('/recientes', estadisticasController.serviciosRecientes);

module.exports = router; 