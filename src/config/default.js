module.exports = {
  port: process.env.PORT || 3000,
  db: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DB_FILE || './data/database.sqlite3',
    },
    useNullAsDefault: true,
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  },
  storage: {
    type: process.env.STORAGE_TYPE || 'local',
    localPath: process.env.LOCAL_STORAGE_PATH || './uploads',
    s3: {
      bucket: process.env.S3_BUCKET || '',
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      region: process.env.S3_REGION || '',
      endpoint: process.env.S3_ENDPOINT || '',
    },
  },
}; 