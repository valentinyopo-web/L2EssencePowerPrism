import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

/** @type {import('mysql2/promise').Pool | null} */
let pool = null;

/** Whether the last connection test succeeded */
let dbConnected = false;

/**
 * Create (or return existing) MySQL connection pool.
 * Credentials stay server-side only — never sent to the frontend.
 */
export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'l2jmobius',
      waitForConnections: true,
      connectionLimit: 10,
      connectTimeout: 5000,
    });
  }
  return pool;
}

/** Test database connectivity and cache the result. */
export async function testConnection() {
  try {
    const connection = await getPool().getConnection();
    await connection.ping();
    connection.release();
    dbConnected = true;
    return true;
  } catch (error) {
    dbConnected = false;
    console.error('[DB] Connection failed:', error.message);
    return false;
  }
}

export function isDbConnected() {
  return dbConnected;
}
