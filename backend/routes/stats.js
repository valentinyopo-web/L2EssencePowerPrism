import { Router } from 'express';
import { fetchStats } from '../services/statsService.js';
import { fetchNextSiege } from '../services/castleService.js';

const router = Router();

/**
 * GET /api/stats
 * Online count, character totals, rates, rankings, next siege.
 */
router.get('/', async (_req, res) => {
  const stats = await fetchStats();
  const nextSiege = await fetchNextSiege();

  res.json({
    ...stats,
    nextSiege,
  });
});

export default router;
