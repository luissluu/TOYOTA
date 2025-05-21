const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { authMiddleware, checkRole } = require('../middlewares/authMiddleware');

router.get('/', usuarioController.getAll);
router.get('/:id', usuarioController.getById);
router.post('/', usuarioController.create);
router.put('/:id', authMiddleware, checkRole(['administrador']), usuarioController.update);
router.delete('/:id', authMiddleware, checkRole(['administrador']), usuarioController.delete);

module.exports = router;