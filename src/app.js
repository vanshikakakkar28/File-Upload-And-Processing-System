const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const config = require('./config/default');
const uploadRouter = require('./routes/upload');
const statusRouter = require('./routes/status');
const filesRouter = require('./routes/files');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/upload', uploadRouter);
app.use('/status', statusRouter);
app.use('/files', filesRouter);

module.exports = app; 