const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

router.get('/', rolController.getAll);
router.get('/:id', rolController.getById);

module.exports = router;