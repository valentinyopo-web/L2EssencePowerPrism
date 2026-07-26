<template>
  <div class="app">
    <AppHeader :server-name="stats.serverName" :links="stats.links" />

    <main>
      <HeroSection
        :server-name="stats.serverName"
        :rates="stats.rates"
        :links="stats.links"
        :online-players="stats.onlinePlayers"
        :next-siege="stats.nextSiege"
        :using-mock-data="stats.usingMockData"
      />

      <ServerStatusCard
        :online-players="stats.onlinePlayers"
        :total-characters="stats.totalCharacters"
        :max-level-count="stats.maxLevelCount"
        :server-status="stats.serverStatus"
        :rates="stats.rates"
      />

      <CustomItemsSection :links="stats.links" />
      <RankingsSection :players="stats.topPlayers" />
      <FeaturesSection />
      <CastleStatus :castles="castles" />
    </main>

    <AppFooter :server-name="stats.serverName" :links="stats.links" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchApi } from './composables/useApi.js';

import AppHeader from './components/AppHeader.vue';
import HeroSection from './components/HeroSection.vue';
import ServerStatusCard from './components/ServerStatusCard.vue';
import CustomItemsSection from './components/CustomItemsSection.vue';
import FeaturesSection from './components/FeaturesSection.vue';
import RankingsSection from './components/RankingsSection.vue';
import CastleStatus from './components/CastleStatus.vue';
import AppFooter from './components/AppFooter.vue';

const defaultStats = {
  onlinePlayers: 0,
  totalCharacters: 0,
  maxLevelCount: 0,
  serverStatus: 'online',
  rates: { xp: 50, sp: 50, adena: 10, drop: 5 },
  serverName: 'Power Prism',
  links: { discord: '#', download: '#', register: '#' },
  topPlayers: [],
  nextSiege: null,
  usingMockData: true,
};

const stats = ref({ ...defaultStats });
const castles = ref([]);

async function loadData() {
  try {
    const [statsData, castleData] = await Promise.all([
      fetchApi('/api/stats'),
      fetchApi('/api/castles'),
    ]);

    stats.value = statsData;
    castles.value = castleData.castles ?? [];
  } catch (error) {
    console.error('Failed to load server data:', error.message);
  }
}

onMounted(() => {
  loadData();
  setInterval(loadData, 60_000);
});
</script>

<style scoped>
.app {
  min-height: 100vh;
}
</style>
