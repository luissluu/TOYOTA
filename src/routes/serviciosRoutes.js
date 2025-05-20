const express = require('express');
const router = express.Router();
const {
    getAllServicios,
    getServicioById,
    createServicio,
    updateServicio,
    deleteServicio
} = require('../controllers/serviciosController');

// Obtener todos los servicios
router.get('/', getAllServicios);

// Obtener un servicio por ID
router.get('/:id', getServicioById);

// Crear un nuevo servicio
router.post('/', createServicio);

// Actualizar un servicio
router.put('/:id', updateServicio);

// Eliminar un servicio
router.delete('/:id', deleteServicio);

module.exports = router; 