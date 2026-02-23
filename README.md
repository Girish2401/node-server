# Avivo Node.js Backend API

A simple Node.js TypeScript REST API server that serves user data from a MySQL database.

## What's Available

- **GET /users** - Returns all users from the database
- **Database** - MySQL database with 30 sample users
- **Docker Setup** - Everything runs in containers (MySQL + API)

## Project Files

- `src/` - TypeScript source code (API server, routes, models)
- `data.ts` - Sample user data (30 users)
- `scripts/seed.js` - Script that creates database and populates data
- `docker-compose.yml` - Docker configuration (MySQL + API)
- `Dockerfile` - API container configuration
- `sql-data/` - MySQL data storage (created automatically)

## How to Run

### Prerequisites
- Docker and Docker Compose installed

### Steps

1. **Start everything:**
   ```bash
   docker-compose up --build -d
   ```
   

2. **Wait for containers to start** (database will be populated automatically)

3. **Test the API:**
   - curl http://localhost:3000/users

4. **Stop containers:**
   ```bash
   docker-compose down
   ```

## API Endpoint

**GET /users**
- Returns all users with their complete information
- Response includes: id, name, email, address, company ,...


## Reset Database

To start with a fresh database:
```bash
docker-compose down
rm -rf sql-data
docker-compose up --build -d
```

## Notes
- Database data is stored in `./sql-data` folder
- API runs on port 3000
- MySQL runs on port 3306
