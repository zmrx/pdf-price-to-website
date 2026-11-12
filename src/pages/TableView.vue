<script setup lang="ts">
import { computed, onUnmounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { priceList, priceTableVisibleColumns } from '../data/priceList'
import PriceTable from '../components/PriceTable.vue'

defineOptions({ name: 'TableView' })

const route = useRoute()

const tableId = computed(() => {
  const { id } = route.params
  return Array.isArray(id) ? id[0] : id
})

const table = computed(() => priceList.find(item => item.id === tableId.value))

// Широкие таблицы в печати уходят в альбомную ориентацию, чтобы влезать в страницу
const WIDE_TABLE_COLUMNS_MIN = 8
const PRINT_ORIENTATION_STYLE_ID = 'print-page-orientation'

// Ширину считаем по видимым колонкам — скрытые не должны влиять на ориентацию
const tableIsWide = computed(() =>
  table.value ? priceTableVisibleColumns(table.value).length >= WIDE_TABLE_COLUMNS_MIN : false,
)

watchEffect(() => {
  const existing = document.getElementById(PRINT_ORIENTATION_STYLE_ID)

  if (!tableIsWide.value) {
    existing?.remove()
    return
  }

  const style = existing ?? document.createElement('style')
  style.id = PRINT_ORIENTATION_STYLE_ID
  style.textContent = '@media print { @page { size: A4 landscape; } }'
  if (!existing) document.head.append(style)
})

onUnmounted(() => document.getElementById(PRINT_ORIENTATION_STYLE_ID)?.remove())
</script>

<template>
  <section class="table-page">
    <RouterLink to="/" class="table-page__back">← Все таблицы</RouterLink>

    <template v-if="table">
      <h1 class="table-page__title">{{ table.title }}</h1>
      <PriceTable :table="table" />
    </template>

    <p v-else class="table-page__missing">
      Таблица не найдена.
      <RouterLink to="/">Вернуться на главную</RouterLink>
    </p>
  </section>
</template>

<style scoped>
.table-page__back {
  display: inline-block;
  margin-bottom: 14px;
  color: var(--color-text-muted);
  font-size: 14px;
  text-decoration: none;
}

.table-page__back:hover {
  color: var(--color-accent);
}

.table-page__title {
  margin: 0 0 18px;
  font-size: 24px;
  font-weight: 700;
}

.table-page__missing {
  margin: 24px 0;
  color: var(--color-text-muted);
}

@media print {
  /* Ссылка навигации в печати не нужна */
  .table-page__back {
    display: none;
  }

  .table-page__title {
    margin-bottom: 10px;
    font-size: 16px;
  }
}
</style>
