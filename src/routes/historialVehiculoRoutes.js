const express = require('express');
const router = express.Router();
const {
    getAllHistorial,
    getHistorialById,
    getHistorialByVehiculo,
    getHistorialByOrden,
    getHistorialByMecanico,
    getHistorialByFecha,
    createHistorial,
    updateHistorial,
    deleteHistorial
} = require('../controllers/historialVehiculoController');

// Obtener todo el historial
router.get('/', getAllHistorial);

// Obtener un registro del historial por ID
router.get('/:id', getHistorialById);

// Obtener historial por vehículo
router.get('/vehiculo/:vehiculoId', getHistorialByVehiculo);

// Obtener historial por orden
router.get('/orden/:ordenId', getHistorialByOrden);

// Obtener historial por mecánico
router.get('/mecanico/:mecanicoId', getHistorialByMecanico);

// Obtener historial por rango de fechas
router.get('/fecha', getHistorialByFecha);




// Crear un nuevo registro en el historial
router.post('/', createHistorial);

// Actualizar un registro del historial
router.put('/:id', updateHistorial);

// Eliminar un registro del historial
router.delete('/:id', deleteHistorial);

module.exports = router; 