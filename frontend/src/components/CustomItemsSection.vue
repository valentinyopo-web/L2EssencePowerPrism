<template>
  <section id="description" class="custom-items">
    <div class="container">
      <div class="custom-items__header">
        <span class="section-eyebrow">Exclusive Content</span>
        <h2 class="section-title">Custom Unique Items</h2>
        <div class="section-divider"></div>
        <p class="section-subtitle">
          Hand-crafted gear and systems inspired by many hack'n'slash such as Diablo II and many other classic.
        </p>
      </div>

      <div class="custom-items__layout">
        <div class="custom-items__content card card--lavender">
          <p class="custom-items__lead">
            We've built an entirely new item ecosystem.
            Designed to reward exploration, skill, and dedication without breaking game balance.
          </p>

          <ul class="custom-items__list">
            <li v-for="item in highlights" :key="item.title" class="item-row">
              <div class="item-row__icon">{{ item.icon }}</div>
              <div>
                <h3 class="item-row__title">{{ item.title }}</h3>
                <p class="item-row__desc">{{ item.description }}</p>
              </div>
            </li>
          </ul>

          <a :href="links.download" class="btn btn-primary custom-items__cta" target="_blank" rel="noopener">
            Start Your Journey
          </a>
        </div>

        <div class="custom-items__showcase">
          <article
            v-for="(item, i) in showcaseItems"
            :key="item.name"
            class="showcase-card"
            :style="{ animationDelay: `${i * 0.1}s` }"
          >
            <div class="showcase-card__glow"></div>
            <span class="showcase-card__tier">{{ item.tier }}</span>
            <h3 class="showcase-card__name">{{ item.name }}</h3>
            <p class="showcase-card__effect">{{ item.effect }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  links: {
    type: Object,
    default: () => ({ download: '#' }),
  },
});

const highlights = [
  {
    icon: '✦',
    title: 'Warg Unique Items',
    description: 'Over 50 new Unique items lines with custom enchant glows and bonuses tied to the Warg expansion content.',
  },
  {
    icon: '◈',
    title: 'Essence Artifacts',
    description: 'New artifact slots with server-exclusive stats — farmed from custom instanced dungeons and world bosses.',
  },
  {
    icon: '⬡',
    title: 'Clan Siege Rewards',
    description: 'Castle-owning clans unlock custom cloaks, agathions, and treasury items found nowhere else.',
  },
  {
    icon: '◎',
    title: 'Glowing Effect for Epic loot',
    description: 'There will be a clearly visible visual effect when you loot any item of high value, with a color that depend of the rarity of the item.',
  },
];

const showcaseItems = [
  { tier: 'Elite', name: 'Arcana', effect: 'Increase further more M.Atk depending of your Casting Speed' },
  { tier: 'Rare', name: 'Silkweave', effect: 'Gain Mana whenever you kill an ennemy' },
  { tier: 'Normal', name: 'Frostburn', effect: 'Slow down your target and reduce his damages' },
];
</script>

<style scoped>
.custom-items {
  padding: 5.5rem 0;
  position: relative;
}

.custom-items__header {
  text-align: center;
  margin-bottom: 3rem;
}

.custom-items__layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 2rem;
  align-items: start;
}

.custom-items__content {
  padding: 2.25rem;
}

.custom-items__lead {
  font-size: 1.05rem;
  color: var(--lavender-soft);
  line-height: 1.75;
  margin-bottom: 2rem;
  opacity: 0.92;
}

.custom-items__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
  margin-bottom: 2rem;
}

.item-row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.item-row__icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(217, 70, 239, 0.12);
  border: 1px solid var(--border-lavender);
  color: var(--accent-light);
  font-size: 1rem;
}

.item-row__title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--lavender-soft);
  margin-bottom: 0.3rem;
  letter-spacing: 0.03em;
}

.item-row__desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.custom-items__cta {
  width: 100%;
}

.custom-items__showcase {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.showcase-card {
  position: relative;
  padding: 1.5rem 1.35rem;
  border-radius: var(--radius-md);
  background: linear-gradient(135deg, rgba(26, 34, 54, 0.9), rgba(17, 24, 39, 0.95));
  border: 1px solid var(--border-lavender);
  overflow: hidden;
  animation: fadeInUp 0.6s ease both;
  transition: border-color 0.25s, transform 0.25s;
}

.showcase-card:hover {
  border-color: var(--border-glow);
  transform: translateX(4px);
}

.showcase-card__glow {
  position: absolute;
  top: -40%;
  right: -20%;
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, rgba(217, 70, 239, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.showcase-card__tier {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-light);
  margin-bottom: 0.5rem;
}

.showcase-card__name {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--lavender-soft);
  margin-bottom: 0.35rem;
}

.showcase-card__effect {
  font-size: 0.82rem;
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .custom-items__layout {
    grid-template-columns: 1fr;
  }
}
</style>
