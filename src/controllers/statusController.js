const db = require('../models/db');

exports.getStatus = (req, res) => {
  const { upload_id } = req.params;
  db.get('SELECT * FROM uploads WHERE id = ?', [upload_id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'DB error', details: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Upload not found' });
    }
    res.json({
      upload_id: row.id,
      filename: row.filename,
      metadata: row.metadata ? JSON.parse(row.metadata) : {},
      status: row.status,
      progress: row.progress + '%',
      error: row.error,
    });
  });
}; 