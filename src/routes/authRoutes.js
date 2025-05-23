const { Router } = require('express');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = Router();

// Rutas de autenticación
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-password', authMiddleware, authController.verifyPassword);
router.post('/change-password', authMiddleware, authController.changePassword);
router.get('/me', authMiddleware, authController.me);

module.exports = router;