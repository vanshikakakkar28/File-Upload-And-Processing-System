const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const config = require('../config/default');

const dbPath = path.resolve(config.db.connection.filename);
const db = new sqlite3.Database(dbPath);

// Initialize uploads table if not exists
const init = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS uploads (
      id TEXT PRIMARY KEY,
      filename TEXT NOT NULL,
      metadata TEXT,
      status TEXT NOT NULL,
      progress INTEGER,
      error TEXT,
      stored_path TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
};

init();

module.exports = db; 