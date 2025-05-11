const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

// Rutas de autenticación
router.post('/login', authController.login);

module.exports = router;