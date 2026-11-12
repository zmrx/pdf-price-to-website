<script setup lang="ts">
import { priceList, priceListMeta } from '../data/priceList'

defineOptions({ name: 'HomeView' })
</script>

<template>
  <section class="home">
    <p class="home__subtitle">{{ priceListMeta.subtitle }}</p>
    <p class="home__warning">
      {{ priceListMeta.warning }}
      <a :href="priceListMeta.warningUrl" target="_blank" rel="noopener noreferrer">
        {{ priceListMeta.warningUrlLabel }}
      </a>
    </p>

    <h2 class="home__heading">Таблицы прайс-листа</h2>
    <nav>
      <ul class="home__list">
        <li v-for="table in priceList" :key="table.id">
          <RouterLink :to="`/table/${table.id}`" class="home__link">
            <span>{{ table.title }}</span>
            <span class="home__arrow">→</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </section>
</template>

<style scoped>
.home__subtitle {
  margin: 0 0 8px;
  color: var(--color-text-muted);
  font-size: 15px;
}

.home__warning {
  margin: 0 0 28px;
  padding: 10px 14px;
  border: 1px solid #fecaca;
  border-radius: 8px;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 14px;
}

.home__warning a {
  color: #b91c1c;
  font-weight: 600;
}

.home__heading {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 600;
}

.home__list {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.home__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.home__link:hover {
  border-color: var(--color-accent);
  box-shadow: 0 2px 8px rgb(29 78 216 / 0.12);
}

.home__arrow {
  color: var(--color-accent);
  font-weight: 400;
}

@media print {
  .home__link {
    border: none;
    border-bottom: 1px solid var(--color-border);
    border-radius: 0;
    padding: 8px 0;
  }

  .home__arrow {
    display: none;
  }
}
</style>
