<template>
  <section class="server-bar">
    <div class="container server-bar__grid">
      <article class="bar-card">
        <div class="bar-card__icon bar-card__icon--status">
          <span class="status-dot" :class="serverStatus"></span>
        </div>
        <div>
          <p class="bar-card__label">Server Status</p>
          <p class="bar-card__value">{{ serverStatus === 'online' ? 'Online' : 'Offline' }}</p>
        </div>
      </article>

      <article class="bar-card bar-card--highlight">
        <div class="bar-card__icon">👥</div>
        <div>
          <p class="bar-card__label">Total Characters</p>
          <p class="bar-card__value">{{ formatNumber(totalCharacters) }}</p>
        </div>
        <span class="bar-card__meta">{{ formatNumber(maxLevelCount) }} max level</span>
      </article>

      <article class="bar-card">
        <div class="bar-card__icon">⚔</div>
        <div>
          <p class="bar-card__label">Rates</p>
          <p class="bar-card__value bar-card__value--sm">
            x{{ rates.xp }} XP · x{{ rates.adena }} Adena
          </p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { formatNumber } from '../composables/useApi.js';

defineProps({
  onlinePlayers: { type: Number, default: 0 },
  totalCharacters: { type: Number, default: 0 },
  maxLevelCount: { type: Number, default: 0 },
  serverStatus: { type: String, default: 'online' },
  rates: {
    type: Object,
    default: () => ({ xp: 50, adena: 10 }),
  },
});
</script>

<style scoped>
.server-bar {
  padding: 0 0 3rem;
  margin-top: -1.5rem;
}

.server-bar__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.bar-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 1.35rem;
  border-radius: var(--radius-md);
  background: rgba(17, 24, 39, 0.65);
  border: 1px solid var(--border-subtle);
  backdrop-filter: blur(12px);
  position: relative;
  transition: border-color 0.25s;
}

.bar-card:hover {
  border-color: var(--border-lavender);
}

.bar-card--highlight {
  background: linear-gradient(135deg, rgba(196, 181, 253, 0.08), rgba(17, 24, 39, 0.8));
  border-color: var(--border-lavender);
}

.bar-card__icon {
  font-size: 1.35rem;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--bg-lavender-panel);
  border: 1px solid var(--border-subtle);
}

.bar-card__icon--status {
  font-size: 0;
}

.bar-card__label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-bottom: 0.15rem;
}

.bar-card__value {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--lavender-soft);
}

.bar-card__value--sm {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--lavender-mid);
}

.bar-card__meta {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.75rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .server-bar__grid {
    grid-template-columns: 1fr;
  }

  .bar-card__meta {
    position: static;
    transform: none;
    margin-left: auto;
  }
}
</style>
