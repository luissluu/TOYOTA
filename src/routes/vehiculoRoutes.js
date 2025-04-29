const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');

router.get('/', vehiculoController.getAll);
router.get('/:id', vehiculoController.getById);
router.post('/', vehiculoController.create);
router.put('/:id', vehiculoController.update);
router.delete('/:id', vehiculoController.delete);

module.exports = router;