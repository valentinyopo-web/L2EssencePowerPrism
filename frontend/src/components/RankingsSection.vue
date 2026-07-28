<template>
  <section id="rankings" class="rankings">
   <div class="container">
    <div class="rankings__header">
      <span class="section-eyebrow">Leaderboard</span>
      <h2 class="section-title">Top Players</h2>
      <div class="section-divider"></div>
      <p class="section-subtitle">
        The strongest players ranked by level and PvP performance
      </p>
    </div>

      <div class="rankings__panel card card--lavender">
        <div class="rankings__panel-header">
          <span class="rankings__live">
            <span class="status-dot online"></span>
            Live from game database
          </span>
        </div>

        <div class="rankings__table-wrap">
          <table class="rankings__table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Character</th>
                <th>Level</th>
                <th>PvP</th>
                <th>PK</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(player, index) in players"
                :key="player.charName"
                :class="{ 'row-top': index < 3 }"
              >
                <td>
                  <span class="rank-badge" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
                </td>
                <td>
                  <span class="rankings__name">{{ player.charName }}</span>
                </td>
                <td><span class="rankings__level">{{ player.level }}</span></td>
                <td>{{ player.pvpKills }}</td>
                <td>{{ player.pkKills }}</td>
              </tr>
              <tr v-if="players.length === 0">
                <td colspan="5" class="rankings__empty">No ranking data available yet.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  players: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.rankings {
  padding: 5.5rem 0;
  background: linear-gradient(180deg, transparent, rgba(196, 181, 253, 0.03), transparent);
}

.rankings__panel {
  padding: 0;
  overflow: hidden;
}

.rankings__header {
  text-align: center;
  margin-bottom: 3rem;
}

.rankings__panel-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-subtle);
  background: rgba(196, 181, 253, 0.04);
}

.rankings__live {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: var(--text-muted);
  letter-spacing: 0.04em;
}

.rankings__table-wrap {
  overflow-x: auto;
}

.rankings__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

.rankings__table th {
  text-align: left;
  padding: 1rem 1.5rem;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--lavender-mid);
  border-bottom: 1px solid var(--border-subtle);
}

.rankings__table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(196, 181, 253, 0.06);
  color: var(--text-secondary);
}

.rankings__table tbody tr {
  transition: background 0.2s;
}

.rankings__table tbody tr:hover td {
  background: rgba(217, 70, 239, 0.05);
}

.row-top td {
  background: rgba(196, 181, 253, 0.03);
}

.rankings__name {
  font-weight: 600;
  color: var(--lavender-soft);
}

.rankings__level {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--accent-light);
}

.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 700;
  background: rgba(196, 181, 253, 0.1);
  color: var(--lavender-mid);
  border: 1px solid var(--border-subtle);
}

.rank-1 {
  background: linear-gradient(135deg, #fde68a, #d97706);
  color: #1a1a1a;
  border-color: transparent;
}

.rank-2 {
  background: linear-gradient(135deg, #e5e7eb, #9ca3af);
  color: #1a1a1a;
  border-color: transparent;
}

.rank-3 {
  background: linear-gradient(135deg, #fdba74, #c2410c);
  color: #fff;
  border-color: transparent;
}

.rankings__empty {
  text-align: center;
  padding: 2.5rem !important;
  color: var(--text-muted);
}
</style>
