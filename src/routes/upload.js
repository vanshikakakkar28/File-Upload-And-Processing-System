const express = require('express');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config/default');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

const allowedExtensions = ['.csv', '.pdf'];
const allowedMimeTypes = [
  'application/pdf',
  'text/csv',
  'application/vnd.ms-excel', // sometimes .csv
];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;
  if (allowedExtensions.includes(ext) && allowedMimeTypes.includes(mime)) {
    cb(null, true);
  } else {
    cb(new Error('Only .csv and .pdf files are allowed!'), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.storage.localPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});

/**
 * @route POST /upload
 */
router.post('/', upload.single('file'), uploadController.handleUpload);

module.exports = router; 