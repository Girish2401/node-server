import mysql, { Connection } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let connection: Connection | null = null;

async function getConnection(): Promise<Connection> {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'avivo_users'
    });
  }
  return connection;
}

export async function testConnection(): Promise<boolean> {
  try {
    const conn = await getConnection();
    await conn.ping();
    console.log('Database connected successfully');
    return true;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Database connection failed:', errorMessage);
    return false;
  }
}

export { getConnection };

