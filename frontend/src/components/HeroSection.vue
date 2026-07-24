<template>
  <section id="home" class="hero">
    <div class="hero__backdrop"></div>

    <div class="container hero__layout">
      <div class="hero__main fade-in">
        <p class="hero__eyebrow">Essence · Custom Content · Active PvP</p>
        <h1 class="hero__title">
          Forge Your Legend on
          <span class="hero__accent">{{ serverName }}</span>
        </h1>
        <p class="hero__desc">
          A premium Lineage 2 Essence experience with custom items, balanced
          progression, and a dedicated community waiting for you.
        </p>

        <div class="hero__rates">
          <div v-for="(rate, key) in rateLabels" :key="key" class="rate-chip">
            <span class="rate-chip__value">x{{ rates[key] }}</span>
            <span class="rate-chip__label">{{ rate }}</span>
          </div>
        </div>

        <div class="hero__actions">
          <a :href="links.download" class="btn btn-primary" target="_blank" rel="noopener">
            Download Client
          </a>
          <a :href="links.register" class="btn btn-outline" target="_blank" rel="noopener">
            Create Account
          </a>
          <a :href="links.discord" class="btn btn-ghost" target="_blank" rel="noopener">
            Join Discord
          </a>
        </div>

        <p v-if="usingMockData" class="hero__notice">
          Demo mode — connect MySQL to display live server data.
        </p>
      </div>

      <div class="hero__aside fade-in">
        <div class="hero__visual">
          <div class="hero__frame"></div>
          <img
            src="/placeholder-hero.svg"
            alt="Fantasy warrior placeholder — replace with your own art"
            class="hero__character"
          />
        </div>

        <!-- Live stat cards (BoH-inspired prominence) -->
        <div class="hero__stats">
          <article class="stat-card stat-card--online">
            <div class="stat-card__top">
              <span class="status-dot online"></span>
              <span class="stat-card__label">Players Online</span>
            </div>
            <p class="stat-card__number">{{ formatNumber(onlinePlayers) }}</p>
            <p class="stat-card__hint">connected right now</p>
          </article>

          <article class="stat-card stat-card--siege">
            <div class="stat-card__top">
              <span class="stat-card__icon">🏰</span>
              <span class="stat-card__label">Next Siege</span>
            </div>
            <p class="stat-card__castle">{{ nextSiege?.castleName ?? 'TBA' }}</p>
            <p class="stat-card__hint">{{ formatSiegeDate(nextSiege?.siegeDate) }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { formatNumber, formatSiegeDate } from '../composables/useApi.js';

defineProps({
  serverName: { type: String, default: 'L2 Essence' },
  rates: {
    type: Object,
    default: () => ({ xp: 50, sp: 50, adena: 10, drop: 5 }),
  },
  links: {
    type: Object,
    default: () => ({ download: '#', register: '#', discord: '#' }),
  },
  onlinePlayers: { type: Number, default: 0 },
  nextSiege: { type: Object, default: null },
  usingMockData: { type: Boolean, default: false },
});

const rateLabels = { xp: 'XP', sp: 'SP', adena: 'Adena', drop: 'Drop' };
</script>

<style scoped>
.hero {
  position: relative;
  padding: 110px 0 5rem;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 70% 40%, rgba(196, 181, 253, 0.1) 0%, transparent 45%),
    radial-gradient(circle at 20% 80%, rgba(217, 70, 239, 0.06) 0%, transparent 40%);
  pointer-events: none;
}

.hero__layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
}

.hero__eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--lavender-mid);
  margin-bottom: 1rem;
}

.hero__title {
  font-family: var(--font-display);
  font-size: clamp(2.1rem, 4.5vw, 3.4rem);
  font-weight: 700;
  line-height: 1.12;
  margin-bottom: 1.1rem;
  color: var(--lavender-soft);
}

.hero__accent {
  display: block;
  margin-top: 0.15rem;
  background: linear-gradient(135deg, var(--lavender-soft), var(--accent-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero__desc {
  color: var(--text-secondary);
  font-size: 1.05rem;
  max-width: 480px;
  margin-bottom: 1.75rem;
  line-height: 1.7;
}

.hero__rates {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: 2rem;
}

.rate-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.55rem 1rem;
  min-width: 72px;
  border-radius: var(--radius-sm);
  background: var(--bg-lavender-panel);
  border: 1px solid var(--border-subtle);
}

.rate-chip__value {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-light);
}

.rate-chip__label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero__notice {
  margin-top: 1.25rem;
  font-size: 0.78rem;
  color: var(--warning);
}

.hero__aside {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  animation-delay: 0.12s;
}

.hero__visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  min-height: 340px;
}

.hero__frame {
  position: absolute;
  inset: 8% 5% 0;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-lavender);
  background: linear-gradient(180deg, rgba(196, 181, 253, 0.06) 0%, transparent 60%);
  pointer-events: none;
}

.hero__character {
  width: min(380px, 90%);
  position: relative;
  z-index: 1;
  filter: drop-shadow(0 24px 48px rgba(196, 181, 253, 0.2));
}

.hero__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-card {
  padding: 1.35rem 1.25rem;
  border-radius: var(--radius-md);
  background: linear-gradient(160deg, rgba(26, 34, 54, 0.95), rgba(17, 24, 39, 0.9));
  border: 1px solid var(--border-lavender);
  box-shadow: var(--shadow-lavender);
  transition: transform 0.25s, border-color 0.25s;
}

.stat-card:hover {
  transform: translateY(-3px);
  border-color: var(--border-glow);
}

.stat-card--online {
  border-top: 2px solid var(--success);
}

.stat-card--siege {
  border-top: 2px solid var(--accent);
}

.stat-card__top {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.65rem;
}

.stat-card__icon {
  font-size: 1rem;
}

.stat-card__label {
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--lavender-mid);
}

.stat-card__number {
  font-family: var(--font-display);
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1;
  color: var(--lavender-soft);
  margin-bottom: 0.25rem;
}

.stat-card__castle {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--lavender-soft);
  margin-bottom: 0.25rem;
}

.stat-card__hint {
  font-size: 0.82rem;
  color: var(--text-muted);
}

@media (max-width: 960px) {
  .hero__layout {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero__desc {
    margin-inline: auto;
  }

  .hero__rates,
  .hero__actions {
    justify-content: center;
  }

  .hero__visual {
    min-height: 260px;
  }

  .hero__character {
    width: min(260px, 65vw);
  }
}

@media (max-width: 520px) {
  .hero__stats {
    grid-template-columns: 1fr;
  }
}
</style>
