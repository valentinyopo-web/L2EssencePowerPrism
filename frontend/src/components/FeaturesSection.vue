<template>
  <section id="features" class="features">
    <div class="container">
      <span class="section-eyebrow">Why Play Here</span>
      <h2 class="section-title">Server Features</h2>
      <div class="section-divider"></div>
      <p class="section-subtitle">
        Built for players who want a polished Essence experience
      </p>

      <div class="features__grid">
        <article
          v-for="(feature, i) in features"
          :key="feature.title"
          class="feature-card"
          :style="{ animationDelay: `${i * 0.08}s` }"
        >
          <div class="feature-card__icon-wrap">
            <span class="feature-card__icon">{{ feature.icon }}</span>
          </div>
          <h3 class="feature-card__title">{{ feature.title }}</h3>
          <p class="feature-card__desc">{{ feature.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: '⚡',
    title: 'Balanced Rates',
    description: 'Custom XP, SP, Adena, and Drop table tuned for fast progression without breaking the economy.',
  },
  {
    icon: '🏰',
    title: 'Active Sieges',
    description: 'Castle sieges on Giran and Goddard with real clan warfare and territory control.',
  },
  {
    icon: '🛡️',
    title: 'Fair Play',
    description: 'Server-side protections and an active GM team to keep the playing field level.',
  },
  {
    icon: '🎮',
    title: 'Essence Content',
    description: 'Lineage 2 Essence 09.1 Warg — latest classes, zones, and endgame systems.',
  },
  {
    icon: '💬',
    title: 'Active Community',
    description: 'Discord events, party finder, clan recruitment, and regular patch notes.',
  },
  {
    icon: '🔄',
    title: 'Regular Updates',
    description: 'Frequent fixes, new system and items are constantly added.',
  },
];
</script>

<style scoped>
.features {
  padding: 5.5rem 0;
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.feature-card {
  padding: 2rem 1.5rem;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
  animation: fadeInUp 0.6s ease both;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: var(--border-lavender);
  box-shadow: var(--shadow-lavender);
}

.feature-card__icon-wrap {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(196, 181, 253, 0.12), rgba(217, 70, 239, 0.08));
  border: 1px solid var(--border-subtle);
  margin-bottom: 1.15rem;
}

.feature-card__icon {
  font-size: 1.4rem;
}

.feature-card__title {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--lavender-soft);
  margin-bottom: 0.55rem;
  letter-spacing: 0.03em;
}

.feature-card__desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.65;
}

@media (max-width: 900px) {
  .features__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .features__grid {
    grid-template-columns: 1fr;
  }
}
</style>
