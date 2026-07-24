import { getPool, isDbConnected } from '../config/db.js';
import { mockCastles } from '../mock/mockData.js';

/**
 * Castle data from L2J_Mobius_Essence_09.1_Warg.
 *
 * `castle` table columns:
 * - id (INT): castle identifier (e.g. 3 = Giran, 7 = Goddard in Essence Warg)
 * - name (varchar): castle display name
 * - siegeDate (bigint): next siege timestamp in milliseconds
 * - regTimeOver (enum 'true'/'false'): whether registration period ended
 * - regTimeEnd (bigint): registration end timestamp
 *
 * Note: This Essence pack's `castle` table does NOT include taxPercent.
 * We return taxPercent as null — replace if your fork adds that column.
 *
 * `clan_data` table columns:
 * - clan_id (INT): primary key
 * - clan_name (varchar): clan display name
 * - hasCastle (INT): castle id owned by clan (0 = none)
 *
 * `siege_clans` table (alternative owner lookup):
 * - castle_id, clan_id, type, castle_owner (1 = owning clan)
 */
export async function fetchCastles() {
  if (!isDbConnected()) {
    return { castles: mockCastles, usingMockData: true };
  }

  try {
    const pool = getPool();

    const [rows] = await pool.execute(
      `SELECT
         c.id,
         c.name,
         c.siegeDate,
         c.regTimeOver,
         c.regTimeEnd,
         cd.clan_name AS ownerClan
       FROM castle c
       LEFT JOIN clan_data cd ON cd.hasCastle = c.id
       ORDER BY c.id ASC`
    );

    const castles = rows.map((row) => ({
      id: row.id,
      name: row.name,
      ownerClan: row.ownerClan || null,
      // taxPercent not present in L2J_Mobius_Essence_09.1_Warg castle.sql
      taxPercent: null,
      siegeDate: Number(row.siegeDate) || 0,
      regTimeOver: row.regTimeOver === 'true',
      regTimeEnd: Number(row.regTimeEnd) || 0,
    }));

    return { castles, usingMockData: false };
  } catch (error) {
    console.error('[DB] fetchCastles failed:', error.message);
    return { castles: mockCastles, usingMockData: true };
  }
}

/**
 * Returns the castle with the nearest upcoming siege date.
 */
export async function fetchNextSiege() {
  const { castles } = await fetchCastles();
  const now = Date.now();

  const upcoming = castles
    .filter((c) => c.siegeDate > now)
    .sort((a, b) => a.siegeDate - b.siegeDate);

  if (upcoming.length === 0) {
    return null;
  }

  return {
    castleName: upcoming[0].name,
    siegeDate: upcoming[0].siegeDate,
  };
}
