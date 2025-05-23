const express = require('express');
const router = express.Router();
const {
    getAllCitas,
    getCitaById,
    getCitasByUsuario,
    getCitasByVehiculo,
    getCitasByFecha,
    createCita,
    updateCita,
    updateEstado,
    deleteCita
} = require('../controllers/citasController');
const { authMiddleware } = require('../middlewares/authMiddleware');

// Obtener todas las citas
router.get('/', getAllCitas);

// Obtener una cita por ID
router.get('/:id', getCitaById);

// Obtener citas por usuario
router.get('/usuario/:usuarioId', getCitasByUsuario);

// Obtener citas por vehículo
router.get('/vehiculo/:vehiculoId', getCitasByVehiculo);

// Obtener citas por fecha
router.get('/fecha/:fecha', getCitasByFecha);

// Crear una nueva cita
router.post('/', authMiddleware, createCita);

// Actualizar una cita
router.put('/:id', updateCita);

// Actualizar estado de una cita
router.patch('/:id/estado', updateEstado);

// Eliminar una cita
router.delete('/:id', deleteCita);

module.exports = router; 