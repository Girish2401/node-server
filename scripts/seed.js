const mysql = require('mysql2/promise');
require('dotenv').config();

// Import the data from TypeScript file
// Use ts-node to load TypeScript directly
require('ts-node/register');
const { usersData } = require('../data.ts');

/**
 * Seed script that creates database, table, and populates with data from data.ts
 */
async function seed() {
  let connection;
  
  try {
    // Connect to MySQL (without specifying database first)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    const dbName = process.env.DB_NAME || 'avivo_users';

    // Create database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Database '${dbName}' created or already exists`);

    // Use the database
    await connection.query(`USE \`${dbName}\``);

    // Create users table with schema matching the data structure
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(100) NOT NULL,
        lastName VARCHAR(100) NOT NULL,
        maidenName VARCHAR(100),
        age INT,
        gender ENUM('male', 'female', 'other'),
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(50),
        username VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        birthDate VARCHAR(50),
        image VARCHAR(500),
        bloodGroup VARCHAR(10),
        height DECIMAL(8,2),
        weight DECIMAL(8,2),
        eyeColor VARCHAR(50),
        hair JSON,
        ip VARCHAR(45),
        address JSON,
        macAddress VARCHAR(50),
        university VARCHAR(255),
        bank JSON,
        company JSON,
        ein VARCHAR(50),
        ssn VARCHAR(50),
        userAgent VARCHAR(500),
        crypto JSON,
        role VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_username (username),
        INDEX idx_role (role)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await connection.query(createTableQuery);
    console.log('✅ Users table created or already exists');

    // Check if users already exist
    const [existingUsers] = await connection.query('SELECT COUNT(*) as count FROM users');
    
    if (existingUsers[0].count > 0) {
      console.log('✅ Users already exist in the database. Skipping seed.');
      console.log(`   Current user count: ${existingUsers[0].count}`);
      return; // Don't exit, just return so server can start
    }

    // Get users from the data file
    const users = usersData.users || [];

    if (users.length === 0) {
      console.error('⚠️  No users found in data file. Skipping seed.');
      return; // Don't exit, let server start
    }

    console.log(`📦 Found ${users.length} users to insert`);

    // Insert users using parameterized queries
    const insertQuery = `
      INSERT INTO users (
        firstName, lastName, maidenName, age, gender, email, phone, username, password,
        birthDate, image, bloodGroup, height, weight, eyeColor, hair, ip, address,
        macAddress, university, bank, company, ein, ssn, userAgent, crypto, role
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
    `;

    for (const user of users) {
      await connection.query(insertQuery, [
        user.firstName,
        user.lastName,
        user.maidenName || null,
        user.age || null,
        user.gender || null,
        user.email,
        user.phone || null,
        user.username || null,
        user.password || null,
        user.birthDate || null,
        user.image || null,
        user.bloodGroup || null,
        user.height || null,
        user.weight || null,
        user.eyeColor || null,
        JSON.stringify(user.hair || null),
        user.ip || null,
        JSON.stringify(user.address || null),
        user.macAddress || null,
        user.university || null,
        JSON.stringify(user.bank || null),
        JSON.stringify(user.company || null),
        user.ein || null,
        user.ssn || null,
        user.userAgent || null,
        JSON.stringify(user.crypto || null),
        user.role || null
      ]);
    }

    console.log(`✅ Successfully seeded ${users.length} users into the database`);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    console.error(error);
    // Don't exit with error code - let server start anyway
    // This allows container to start even if seed fails (e.g., data already exists)
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run seed and ensure it completes before script exits
seed().then(() => {
  console.log('✅ Seed process completed');
  process.exit(0);
}).catch((error) => {
  console.error('⚠️  Seed process had issues, but continuing...');
  console.error(error);
  process.exit(0); // Exit with success code so server can start
});
