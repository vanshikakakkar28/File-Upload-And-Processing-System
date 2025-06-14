# File Upload & Processing System

A backend system for uploading, processing, and managing files with metadata, background jobs, and RESTful APIs. Built with Node.js, Express, BullMQ, SQLite3, and Redis.

## Tech Stack
- **Node.js & Express**: REST API server
- **SQLite3**: Lightweight database for uploads and metadata
- **BullMQ + Redis**: Background job processing
- **Multer**: File uploads
- **Docker**: Containerization

## Features
- Upload large files (1MB–10MB) with metadata
- Track upload and processing status
- Background job processing (BullMQ + Redis)
- Local or S3-compatible storage
- List and download files
- RESTful API with Swagger docs

## Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd <repo-folder>
```

### 2. Environment Variables
Create a `.env` file in the root directory. Example variables:

```
# .env.example
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
S3_BUCKET=your-bucket
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_REGION=your-region
S3_ENDPOINT=your-endpoint
STORAGE_LOCAL_PATH=./uploads
```

### 3. Install dependencies
```bash
npm install
```

### 4. Initialize the Database
The database (SQLite) is initialized automatically on first run. No manual setup required.

### 5. Start Redis server
If running locally:
```bash
redis-server
```
Or use Docker (see below).

### 6. Run the server
```bash
npm start
```

---

## Running with Docker

### Build and start all services (app + Redis):
```bash
docker-compose up --build
```
- The app will be available at [http://localhost:3000](http://localhost:3000)
- Redis will be available at port 6379

---

## Codebase Overview

- **src/routes/**: Express route definitions (API endpoints)
- **src/controllers/**: Business logic for each API endpoint
- **src/models/**: Database models and initialization
- **src/jobs/**: Background job processing (BullMQ)
- **src/config/**: Configuration (reads from environment variables)
- **uploads/**: Local file storage
- **data/**: SQLite database files

### Example API Endpoints
- `POST /upload`: Upload a file (multipart/form-data)
- `GET /files`: List all uploaded files
- `GET /files/:upload_id/download`: Download a file
- `GET /status/:upload_id`: Get status of an upload

---

## Usage Example

Health check:
```bash
curl http://localhost:3000/health
```

---

## Notes
- Ensure Redis is running for background jobs.
- Edit `.env` to match your environment (see `.env.example`).
- For S3 storage, set the S3-related environment variables.
- The database and uploads are persisted in local folders by default.

---

For further usage and API documentation, see code comments in `src/routes/` and `src/controllers/`. 