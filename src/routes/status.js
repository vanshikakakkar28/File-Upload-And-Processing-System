const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

/**
 * @route GET /status/:upload_id
 */
router.get('/:upload_id', statusController.getStatus);

module.exports = router; 