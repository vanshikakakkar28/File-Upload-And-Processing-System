const { v4: uuidv4 } = require('uuid');
const db = require('../models/db');
const config = require('../config/default');
const { fileQueue } = require('../jobs/fileProcessor');
const fs = require('fs');

// Ensure upload directory exists
if (!fs.existsSync(config.storage.localPath)) {
  fs.mkdirSync(config.storage.localPath, { recursive: true });
}

exports.handleUpload = (req, res) => {
  try {
    const file = req.file;
    const metadata = req.body.metadata ? JSON.parse(req.body.metadata) : {};
    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }
    if (file.size < 1024 * 1024) {
      return res.status(400).json({ error: 'File must be at least 1MB' });
    }
    if (file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ error: 'File must be less than 10MB' });
    }
    const uploadId = uuidv4();
    const now = new Date().toISOString();
    db.run(
      `INSERT INTO uploads (id, filename, metadata, status, progress, error, stored_path, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uploadId,
        file.originalname,
        JSON.stringify(metadata),
        'processing',
        0,
        null,
        file.path,
        now,
        now,
      ],
      (err) => {
        if (err) {
          return res.status(500).json({ error: 'DB error', details: err.message });
        }
        fileQueue.add('process', { uploadId, filePath: file.path });
        res.status(201).json({ upload_id: uploadId, status: 'processing' });
      },
    );
  } catch (e) {
    res.status(400).json({ error: 'Invalid metadata or request', details: e.message });
  }
}; 