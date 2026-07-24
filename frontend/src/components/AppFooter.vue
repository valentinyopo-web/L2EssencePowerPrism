<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <span class="footer__logo">L2</span>
          <div>
            <p class="footer__name">{{ serverName }}</p>
            <p class="footer__tagline">Lineage 2 Essence Private Server</p>
          </div>
        </div>

        <div class="footer__links">
          <a :href="links.download" class="btn btn-primary" target="_blank" rel="noopener">Download</a>
          <a :href="links.register" class="btn btn-outline" target="_blank" rel="noopener">Register</a>
          <a :href="links.discord" class="btn btn-ghost" target="_blank" rel="noopener">Discord</a>
        </div>
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">
          Not affiliated with NCsoft. Lineage II is a registered trademark of NCsoft Corporation.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  serverName: { type: String, default: 'L2 Essence' },
  links: {
    type: Object,
    default: () => ({ download: '#', register: '#', discord: '#' }),
  },
});
</script>

<style scoped>
.footer {
  padding: 3.5rem 0 2rem;
  border-top: 1px solid var(--border-subtle);
  background: rgba(11, 15, 26, 0.6);
}

.footer__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--accent-light), var(--accent-dark));
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.85rem;
  color: #fff;
}

.footer__name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--lavender-soft);
  letter-spacing: 0.04em;
}

.footer__tagline {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-top: 0.15rem;
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.footer__bottom {
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-subtle);
  text-align: center;
}

.footer__copy {
  font-size: 0.75rem;
  color: var(--text-muted);
  max-width: 520px;
  margin-inline: auto;
}

@media (max-width: 640px) {
  .footer__top {
    flex-direction: column;
    text-align: center;
  }

  .footer__brand {
    flex-direction: column;
  }

  .footer__links {
    justify-content: center;
  }
}
</style>
