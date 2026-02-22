# Avivo Node.js Backend API

A Node.js TypeScript REST API server for user management with MySQL database integration. This project implements a backend API that serves user data stored in a MySQL database, mimicking the structure from [dummyjson.com/users](https://dummyjson.com/users).

## Features

- ✅ RESTful API with Express.js and TypeScript
- ✅ MySQL database integration with connection pooling
- ✅ Secure parameterized queries (SQL injection prevention)
- ✅ Environment variable configuration
- ✅ Comprehensive error handling
- ✅ Docker containerization support
- ✅ Database migration and seeding scripts

## Prerequisites

- Node.js (v18 or higher)
- TypeScript
- MySQL (v8.0 or higher) - if running without Docker
- Docker and Docker Compose (for containerized deployment)

## Project Structure

```
node-server/
├── src/
│   ├── config/
│   │   └── database.ts       # Database connection configuration
│   ├── models/
│   │   └── User.ts           # User model with database operations
│   ├── routes/
│   │   └── users.ts          # User routes
│   ├── middleware/
│   │   └── errorHandler.ts   # Global error handling middleware
│   └── server.ts             # Main application entry point
├── scripts/
│   └── seed.js               # Database seeding script (creates DB, table, and populates data)
├── data.ts                   # User data to be seeded into database
├── database/
│   └── dump.sql              # Complete SQL dump with schema and data
├── sql-data/                 # MySQL data directory (created automatically, cross-platform)
├── dist/                     # Compiled JavaScript (generated)
├── tsconfig.json             # TypeScript configuration
├── .dockerignore             # Docker ignore file
├── .gitignore                # Git ignore file
├── Dockerfile                # Docker image configuration
├── docker-compose.yml        # Docker Compose configuration
└── package.json              # Node.js dependencies
```

## Setup Instructions

### Option 1: Using Docker (Recommended)

This is the easiest way to get started. Docker Compose will set up both the MySQL database and the Node.js API.

1. **Clone or navigate to the project directory:**
   ```bash
   cd node-server
   ```

2. **Start the services using Docker Compose:**
   ```bash
   docker-compose up -d
   ```

   This will:
   - Build the Node.js API Docker image
   - Start MySQL container
   - Wait for MySQL to be healthy
   - **Run seed script first** (creates database, table, and populates with data from `data.ts`)
   - **Then start the API server** (only after seed completes - ensures data is ready before API accepts requests)
   - Create `sql-data` folder at root level for MySQL data persistence (cross-platform compatible)
   
   **Note:** The seed script runs **sequentially** (not in background), so the server only starts after the database is populated. This ensures that API requests won't come in before data is ready.

3. **Check if services are running:**
   ```bash
   docker-compose ps
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f api
   ```

5. **Stop the services:**
   ```bash
   docker-compose down
   ```

6. **Stop the services:**
   ```bash
   docker-compose down
   ```

   **Note:** 
   - Database is automatically populated when containers start
   - Database data is stored in `./sql-data` folder at the root level
   - This folder is automatically created and works across Mac M4, Ubuntu, and Windows
   - If you need to re-seed the database, you can run: `docker-compose exec api npm run seed`

### Option 2: Local Development Setup

If you prefer to run the application locally without Docker:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up MySQL database:**
   - Make sure MySQL is running on your machine
   - Create a database (or use the default `avivo_users`)

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` file with your database credentials:
   ```env
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=avivo_users
   ```

4. **Set up the database (choose one method):**

   **Method A: Using SQL dump (Quick setup):**
   ```bash
   mysql -u root -p < database/dump.sql
   ```

   **Method B: Using seed script:**
   ```bash
   npm run seed
   ```
   
   **Note:** The seed script will automatically create the database, table, and populate it with data from `data.ts`.

5. **Build TypeScript:**
   ```bash
   npm run build
   ```

6. **Start the server:**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Users

- **GET** `/users`
  - Fetch all users from the database
  - Response:
    ```json
    {
      "success": true,
      "total": 5,
      "users": [
        {
          "id": 1,
          "firstName": "Terry",
          "lastName": "Medhurst",
          "email": "atuny0@sohu.com",
          "company_name": "Blanda-O'Keefe",
          "role": "Admin",
          "address_country": "United States",
          ...
        }
      ]
    }
    ```

## Database Schema

The `users` table includes the following fields (matching dummyjson.com structure):

- Basic Info: `id`, `firstName`, `lastName`, `maidenName`, `age`, `gender`
- Contact: `email`, `phone`, `username`, `password`
- Physical: `height`, `weight`, `eyeColor`, `hairColor`, `hairType`, `bloodGroup`
- Address: `address_street`, `address_city`, `address_state`, `address_postalCode`, `address_country`, `address_coordinates_lat`, `address_coordinates_lng`
- Company: `company_name`, `company_department`, `company_title`, `company_address_*`
- Other: `domain`, `ip`, `ein`, `ssn`, `userAgent`, `role`, `image`, `birthDate`
- Timestamps: `createdAt`, `updatedAt`

## Security Features

1. **SQL Injection Prevention**: All database queries use parameterized statements
2. **Environment Variables**: Sensitive data (database credentials) stored in environment variables
3. **Error Handling**: Graceful error handling with appropriate HTTP status codes
4. **Input Validation**: Basic validation for user inputs

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | - |
| `DB_NAME` | Database name | `avivo_users` |

## Scripts

- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start the production server (runs compiled JavaScript)
- `npm run dev` - Start development server with auto-reload
- `npm run seed` - Seed database (creates DB, table, and populates with data from data.ts)

## Testing the API

Once the server is running, you can test the endpoints:

```bash
# Get all users
curl http://localhost:3000/users
```

Or use a tool like Postman or your browser to access:
- http://localhost:3000/users

## Troubleshooting

### Database Connection Issues

1. **Check MySQL is running:**
   ```bash
   # For Docker
   docker-compose ps mysql
   
   # For local MySQL
   mysql -u root -p
   ```

2. **Verify environment variables:**
   - Ensure `.env` file exists and has correct values
   - For Docker, check `docker-compose.yml` environment section

3. **Check database exists:**
   ```bash
   mysql -u root -p -e "SHOW DATABASES;"
   ```

### Port Already in Use

If port 3000 is already in use:
- Change `PORT` in `.env` file
- Or update `docker-compose.yml` ports mapping

### Docker Issues

- **Clean rebuild:**
  ```bash
  docker-compose down -v
  docker-compose build --no-cache
  docker-compose up -d
  ```

- **View detailed logs:**
  ```bash
  docker-compose logs api
  docker-compose logs mysql
  ```

## Development

### Adding New Endpoints

1. Create route file in `routes/` directory
2. Add route to `server.js`:
   ```javascript
   const newRoute = require('./routes/newRoute');
   app.use('/new-route', newRoute);
   ```

### Database Changes

1. Update migration script in `scripts/migrate.js`
2. Run migration: `npm run migrate`
3. Update seed script if needed: `scripts/seed.js`

## License

ISC

## Author

Developed for AVIVO AI TECHNOLOGY PRIVATE LIMITED

