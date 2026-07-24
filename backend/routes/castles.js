import { Router } from 'express';
import { fetchCastles } from '../services/castleService.js';

const router = Router();

/**
 * GET /api/castles
 * All castles with owner clan, siege date, and registration info.
 */
router.get('/', async (_req, res) => {
  const result = await fetchCastles();
  res.json(result);
});

export default router;
