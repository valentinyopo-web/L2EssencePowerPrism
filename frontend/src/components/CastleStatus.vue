<template>
  <section id="castles" class="castles">
  <div class="container">
    <div class="castles__header">
      <span class="section-eyebrow">Territory War</span>
      <h2 class="section-title">Castle Ownership</h2>
      <div class="section-divider"></div>
      <p class="section-subtitle">
        Clans fighting for control of Giran and Goddard
      </p>
    </div>

      <div class="castles__grid">
        <article v-for="castle in castles" :key="castle.id" class="castle-card card">
          <div class="castle-card__banner">
            <span class="castle-card__id">Castle #{{ castle.id }}</span>
          </div>

          <h3 class="castle-card__name">{{ castle.name }}</h3>

          <div class="castle-card__owner">
            <span class="castle-card__label">Ruling Clan</span>
            <span class="castle-card__clan">
              {{ castle.ownerClan || 'Unclaimed' }}
            </span>
          </div>

          <div class="castle-card__footer">
            <div class="castle-card__stat">
              <span class="castle-card__label">Next Siege</span>
              <span>{{ formatSiegeDate(castle.siegeDate) }}</span>
            </div>
            <div class="castle-card__stat">
              <span class="castle-card__label">Registration</span>
              <span :class="castle.regTimeOver ? 'tag-closed' : 'tag-open'">
                {{ castle.regTimeOver ? 'Closed' : 'Open' }}
              </span>
            </div>
          </div>
        </article>

        <p v-if="castles.length === 0" class="castles__empty">
          No castle data available.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { formatSiegeDate } from '../composables/useApi.js';

defineProps({
  castles: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.castles {
  padding: 5.5rem 0 6rem;
}

.castles__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.25rem;
}

.castles__header {
  text-align: center;
  margin-bottom: 3rem;
}

.castle-card {
  padding: 0;
  overflow: hidden;
}

.castle-card__banner {
  padding: 0.85rem 1.35rem;
  background: linear-gradient(90deg, rgba(196, 181, 253, 0.1), rgba(217, 70, 239, 0.06));
  border-bottom: 1px solid var(--border-subtle);
}

.castle-card__id {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--lavender-mid);
}

.castle-card__name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--lavender-soft);
  padding: 1.25rem 1.35rem 0;
  letter-spacing: 0.04em;
}

.castle-card__owner {
  padding: 1rem 1.35rem;
}

.castle-card__label {
  display: block;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-bottom: 0.3rem;
}

.castle-card__clan {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--accent-light);
}

.castle-card__footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 1.15rem 1.35rem;
  border-top: 1px solid var(--border-subtle);
  background: rgba(196, 181, 253, 0.03);
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.tag-open {
  color: var(--success);
  font-weight: 600;
}

.tag-closed {
  color: var(--text-muted);
}

.castles__empty {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--text-muted);
  padding: 2rem;
}
</style>
