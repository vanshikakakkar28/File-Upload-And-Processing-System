const { Worker, Queue } = require('bullmq');
const IORedis = require('ioredis');
const db = require('../models/db');
const config = require('../config/default');

const connection = new IORedis({
  host: config.redis.host,
  port: config.redis.port,
  maxRetriesPerRequest: null, 
});

const queueName = 'file-processing';
const fileQueue = new Queue(queueName, { connection });

const worker = new Worker(
  queueName,
  async (job) => {
    const { uploadId, filePath } = job.data;
    let progress = 0;
    try {
      for (let i = 1; i <= 10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        progress = i * 10;
        db.run(
          'UPDATE uploads SET progress = ?, status = ?, updated_at = ? WHERE id = ?',
          [progress, 'processing', new Date().toISOString(), uploadId],
        );
      }
      db.run(
        'UPDATE uploads SET status = ?, progress = ?, updated_at = ? WHERE id = ?',
        ['completed', 100, new Date().toISOString(), uploadId],
      );
      return { success: true };
    } catch (err) {
      db.run(
        'UPDATE uploads SET status = ?, error = ?, updated_at = ? WHERE id = ?',
        ['failed', err.message, new Date().toISOString(), uploadId],
      );
      throw err;
    }
  },
  {
    connection,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
);

worker.on('failed', (job, err) => {
  db.run(
    'UPDATE uploads SET status = ?, error = ?, updated_at = ? WHERE id = ?',
    ['failed', err.message, new Date().toISOString(), job.data.uploadId],
  );
});

module.exports = { fileQueue }; 