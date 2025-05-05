const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

router.get('/', citaController.getAll);
router.get('/fecha/:fecha', citaController.getByFecha);
router.get('/usuario/:usuarioId', citaController.getByUsuario);
router.get('/:id', citaController.getById);
router.post('/', citaController.create);
router.put('/:id', citaController.update);
router.patch('/:id/estado', citaController.updateEstado);
router.delete('/:id', citaController.delete);

module.exports = router;