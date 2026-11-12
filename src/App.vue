<script setup lang="ts">
import { priceListMeta } from './data/priceList'

defineOptions({ name: 'App' })
</script>

<template>
  <div class="app">
    <header class="app__header">
      <div class="app__container app__header-inner">
        <RouterLink to="/" class="app__brand">{{ priceListMeta.brand }}</RouterLink>
        <span class="app__tagline">система бесшовных стен</span>
      </div>
    </header>

    <main class="app__main app__container">
      <RouterView />
    </main>

    <footer class="app__footer">
      <div class="app__container">{{ priceListMeta.footerNote }}</div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app__header {
  background: var(--color-header);
  color: #ffffff;
}

.app__header-inner {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding-top: 16px;
  padding-bottom: 16px;
}

.app__brand {
  color: #ffffff;
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-decoration: none;
}

.app__tagline {
  color: rgb(255 255 255 / 0.55);
  font-size: 13px;
}

.app__main {
  flex: 1;
  padding-top: 28px;
  padding-bottom: 40px;
}

.app__footer {
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text-muted);
  font-size: 13px;
}

.app__footer > .app__container {
  padding-top: 14px;
  padding-bottom: 14px;
}
</style>
