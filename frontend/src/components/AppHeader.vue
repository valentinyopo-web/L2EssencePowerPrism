<template>
  <header class="header" :class="{ 'header--scrolled': scrolled }">
    <div class="container header__inner">
      <a href="#home" class="logo">
        <span class="logo__mark">L2</span>
        <span class="logo__text">{{ serverName }}</span>
      </a>

      <nav class="nav" :class="{ 'nav--open': menuOpen }">
        <a href="#home" @click="closeMenu">Home</a>
        <a href="#description" @click="closeMenu">Custom Items</a>
        <a href="#rankings" @click="closeMenu">Rankings</a>
        <a href="#features" @click="closeMenu">Features</a>
        <a href="#castles" @click="closeMenu">Castles</a>
      </nav>

      <div class="header__actions">
        <a :href="links.download" class="btn btn-primary btn--sm" target="_blank" rel="noopener">
          Download
        </a>
        <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

defineProps({
  serverName: { type: String, default: 'L2 Essence' },
  links: {
    type: Object,
    default: () => ({ register: '#', download: '#', discord: '#' }),
  },
});

const menuOpen = ref(false);
const scrolled = ref(false);

function closeMenu() {
  menuOpen.value = false;
}

function onScroll() {
  scrolled.value = window.scrollY > 40;
}

onMounted(() => window.addEventListener('scroll', onScroll));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(11, 15, 26, 0.6);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
  transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
}

.header--scrolled {
  background: rgba(11, 15, 26, 0.92);
  border-bottom-color: var(--border-subtle);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.logo__mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--accent-light), var(--accent-dark));
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: #fff;
  box-shadow: 0 2px 12px var(--accent-glow);
}

.logo__text {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.05em;
  color: var(--lavender-soft);
}

.nav {
  display: flex;
  gap: 1.75rem;
}

.nav a {
  color: var(--text-secondary);
  font-size: 0.88rem;
  font-weight: 500;
  transition: color 0.2s;
  position: relative;
}

.nav a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width 0.25s;
}

.nav a:hover {
  color: var(--lavender-soft);
}

.nav a:hover::after {
  width: 100%;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn--sm {
  padding: 0.55rem 1.2rem;
  font-size: 0.82rem;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}

.menu-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--lavender-soft);
  border-radius: 2px;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: rgba(11, 15, 26, 0.97);
    padding: 1.5rem 2rem;
    gap: 1.1rem;
    transform: translateY(-120%);
    opacity: 0;
    transition: transform 0.3s, opacity 0.3s;
    border-bottom: 1px solid var(--border-subtle);
  }

  .nav--open {
    transform: translateY(0);
    opacity: 1;
  }

  .header__actions .btn-primary {
    display: none;
  }
}
</style>
