import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { testConnection } from './config/db.js';
import healthRoutes from './routes/health.js';
import statsRoutes from './routes/stats.js';
import castleRoutes from './routes/castles.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// CORS for local Vue dev server (Vite default: http://localhost:5173)
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET'],
  })
);

app.use(express.json());

// API routes
app.use('/api/health', healthRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/castles', castleRoutes);

// Root — quick sanity check
app.get('/', (_req, res) => {
  res.json({ message: 'L2 Website API — use /api/health, /api/stats, /api/castles' });
});

async function start() {
  const dbOk = await testConnection();

  if (dbOk) {
    console.log('[DB] Connected to MySQL:', process.env.DB_NAME);
  } else {
    console.warn('[DB] Not connected — serving mock data until MySQL is configured.');
  }

  app.listen(PORT, () => {
    console.log(`[API] Server running at http://localhost:${PORT}`);
  });
}

start();
