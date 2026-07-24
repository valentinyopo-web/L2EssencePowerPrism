import { Router } from 'express';
import { testConnection, isDbConnected } from '../config/db.js';

const router = Router();

/**
 * GET /api/health
 * Returns backend + database connectivity status.
 */
router.get('/', async (_req, res) => {
  const dbOk = await testConnection();

  res.json({
    status: 'ok',
    backend: true,
    database: dbOk,
    timestamp: new Date().toISOString(),
    message: dbOk
      ? 'Backend and database are connected.'
      : 'Backend is running. Database unavailable — API will serve mock data.',
  });
});

export default router;
