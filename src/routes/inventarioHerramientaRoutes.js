const express = require('express');
const router = express.Router();
const {
    getAllHerramientas,
    getHerramientaById,
    createHerramienta,
    updateHerramienta,
    deleteHerramienta
} = require('../controllers/inventarioHerramientaController');

// Obtener todas las herramientas
router.get('/', getAllHerramientas);

// Obtener una herramienta por ID
router.get('/:id', getHerramientaById);

// Crear una nueva herramienta
router.post('/', createHerramienta);

// Actualizar una herramienta
router.put('/:id', updateHerramienta);

// Eliminar una herramienta
router.delete('/:id', deleteHerramienta);

module.exports = router; 