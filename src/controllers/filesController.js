const db = require('../models/db');
const fs = require('fs');
const path = require('path');

exports.listFiles = (req, res) => {
  db.all('SELECT * FROM uploads', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'DB error', details: err.message });
    }
    const files = rows.map(row => ({
      upload_id: row.id,
      filename: row.filename,
      metadata: row.metadata ? JSON.parse(row.metadata) : {},
      status: row.status,
      progress: row.progress + '%',
      error: row.error,
      created_at: row.created_at,
      updated_at: row.updated_at
    }));
    res.json({ files });
  });
};

exports.downloadFile = (req, res) => {
  const { upload_id } = req.params;
  db.get('SELECT * FROM uploads WHERE id = ?', [upload_id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'DB error', details: err.message });
    }
    if (!row || !row.stored_path) {
      return res.status(404).json({ error: 'File not found' });
    }
    if (!fs.existsSync(row.stored_path)) {
      return res.status(404).json({ error: 'File not found on disk' });
    }
    res.download(row.stored_path, row.filename, err => {
      if (err) {
        return res.status(500).json({ error: 'Error sending file', details: err.message });
      }
    });
  });
}; 