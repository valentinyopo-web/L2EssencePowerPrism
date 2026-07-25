/**
 * Fallback data when MySQL is unavailable.
 * Keeps the frontend usable during local development / tutorial setup.
 */

export const mockStats = {
  onlinePlayers: 142,
  totalCharacters: 3847,
  maxLevelCount: 23,
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
  topPlayers: [
    { charName: 'DarkKnight', level: 85, pvpKills: 312, pkKills: 4 },
    { charName: 'MoonBlade', level: 85, pvpKills: 287, pkKills: 1 },
    { charName: 'StormCaller', level: 84, pvpKills: 245, pkKills: 8 },
    { charName: 'IronWolf', level: 84, pvpKills: 198, pkKills: 2 },
    { charName: 'ShadowFox', level: 83, pvpKills: 176, pkKills: 0 },
  ],
  nextSiege: {
    castleName: 'Giran',
    siegeDate: Date.now() + 3 * 24 * 60 * 60 * 1000,
  },
  usingMockData: true,
};

export const mockCastles = [
  {
    id: 3,
    name: 'Giran',
    ownerClan: 'DragonSlayers',
    taxPercent: null,
    siegeDate: Date.now() + 3 * 24 * 60 * 60 * 1000,
    regTimeOver: true,
    regTimeEnd: 0,
  },
  {
    id: 7,
    name: 'Goddard',
    ownerClan: 'NorthernWolves',
    taxPercent: null,
    siegeDate: Date.now() + 5 * 24 * 60 * 60 * 1000,
    regTimeOver: false,
    regTimeEnd: Date.now() + 2 * 24 * 60 * 60 * 1000,
  },
];
