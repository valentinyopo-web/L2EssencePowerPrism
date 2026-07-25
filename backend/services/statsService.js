import { getPool, isDbConnected } from '../config/db.js';
import { mockStats } from '../mock/mockData.js';

/**
 * Server statistics from L2J_Mobius_Essence_09.1_Warg `characters` table.
 *
 * Relevant columns:
 * - online (TINYINT): 1 = character currently in game
 * - deletetime (bigint): 0 = active character, >0 = scheduled deletion
 * - accesslevel (MEDIUMINT): 0 = normal player, >0 = GM/staff
 * - level (TINYINT): character level
 * - pvpkills, pkkills (SMALLINT): PvP / PK kill counts
 * - char_name (VARCHAR): display name
 */
export async function fetchStats() {
  if (!isDbConnected()) {
    return { ...mockStats, usingMockData: true };
  }

  try {
    const pool = getPool();

    // Count players currently online (characters.online = 1)
    const [onlineRows] = await pool.execute(
      `SELECT COUNT(*) AS count
       FROM characters
       WHERE online = 1
         AND deletetime = 0
         AND accesslevel = 0`
    );

    // Total active characters (deletetime = 0 means not deleted)
    const [totalRows] = await pool.execute(
      `SELECT COUNT(*) AS count
       FROM characters
       WHERE deletetime = 0
         AND accesslevel = 0`
    );

    // Characters at max level (useful population metric)
    const [maxLevelRows] = await pool.execute(
      `SELECT COUNT(*) AS count
       FROM characters
       WHERE deletetime = 0
         AND accesslevel = 0
         AND level = (
           SELECT MAX(level)
           FROM characters
           WHERE deletetime = 0 AND accesslevel = 0
         )`
    );

    // Top 5 players for homepage rankings section
    const [topRows] = await pool.execute(
      `SELECT char_name AS charName,
              level,
              pvpkills AS pvpKills,
              pkkills AS pkKills
       FROM characters
       WHERE deletetime = 0
         AND accesslevel = 0
       ORDER BY level DESC, pvpkills DESC, pkkills DESC
       LIMIT 5`
    );

    const onlinePlayers = onlineRows[0]?.count ?? 0;
    const totalCharacters = totalRows[0]?.count ?? 0;

    return {
      onlinePlayers,
      totalCharacters,
      maxLevelCount: maxLevelRows[0]?.count ?? 0,
      serverStatus: 'online',
      rates: {
        xp: Number(process.env.XP_RATE) || 40,
        sp: Number(process.env.SP_RATE) || 10,
        adena: Number(process.env.ADENA_RATE) || 10,
        drop: Number(process.env.DROP_RATE) || 1,
      },
      serverName: process.env.SERVER_NAME || 'Power Prism',
      links: {
        discord: process.env.DISCORD_URL || 'https://discord.gg/CXzPceuHt',
        download: process.env.DOWNLOAD_URL || 'https://e.pcloud.link/publink/show?code=XZSxToZv8aD7dW5g1zpvU6gv9jlMy29K2zy',
        register: process.env.REGISTER_URL || '#',
      },
      topPlayers: topRows,
      usingMockData: false,
    };
  } catch (error) {
    console.error('[DB] fetchStats failed:', error.message);
    return { ...mockStats, usingMockData: true };
  }
}
