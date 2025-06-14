const express = require('express');
const router = express.Router();
const filesController = require('../controllers/filesController');


/**
 * @route GET /files
 */
router.get('/', filesController.listFiles);

/**
 * @route GET /files/:upload_id/download
 */
router.get('/:upload_id/download', filesController.downloadFile);

module.exports = router; 