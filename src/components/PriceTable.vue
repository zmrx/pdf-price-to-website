<script setup lang="ts">
import { computed } from 'vue'
import type { PriceCell, PriceRow, PriceTable } from '../data/priceList'

defineOptions({ name: 'PriceTable' })

interface Props {
  table: PriceTable
}

const props = defineProps<Props>()

/** Ячейка в нормализованном виде: строка → { text } */
const priceCellNormalize = (cell: string | PriceCell): PriceCell =>
  typeof cell === 'string' ? { text: cell } : cell

interface RowCellView {
  cell: PriceCell
  /** Фактический индекс колонки с учётом colspan предыдущих ячеек */
  columnIndex: number
}

/** Чистая трансформация: строка данных → ячейки с фактическими индексами колонок */
const priceRowResolve = (row: PriceRow): RowCellView[] => {
  const result: RowCellView[] = []
  let columnIndex = 0

  for (const rawCell of row.cells) {
    const cell = priceCellNormalize(rawCell)
    result.push({ cell, columnIndex })
    columnIndex += cell.colspan ?? 1
  }

  return result
}

interface GroupView {
  title?: string
  note?: string
  rows: RowCellView[][]
}

const groupsView = computed<GroupView[]>(() =>
  props.table.groups.map(group => ({
    title: group.title,
    note: group.note,
    rows: group.rows.map(priceRowResolve),
  })),
)

const columnsTotal = computed(() => props.table.columns.length)

const columnIsNumeric = (columnIndex: number): boolean =>
  props.table.numericColumns.includes(columnIndex)
</script>

<template>
  <div class="price-table">
    <table>
      <thead>
        <tr>
          <th
            v-for="(column, columnIndex) in table.columns"
            :key="columnIndex"
            :class="{ 'is-numeric': columnIsNumeric(columnIndex) }"
          >
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(group, groupIndex) in groupsView" :key="groupIndex">
          <tr v-if="group.title" class="price-table__group">
            <th :colspan="columnsTotal">{{ group.title }}</th>
          </tr>
          <tr v-if="group.note" class="price-table__note">
            <td :colspan="columnsTotal">{{ group.note }}</td>
          </tr>
          <tr v-for="(row, rowIndex) in group.rows" :key="rowIndex" class="price-table__row">
            <td
              v-for="{ cell, columnIndex } in row"
              :key="columnIndex"
              :colspan="cell.colspan"
              :rowspan="cell.rowspan"
              :class="{ 'is-numeric': columnIsNumeric(columnIndex), 'is-muted': cell.text === '—' }"
            >
              {{ cell.text }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <p v-if="table.footnote" class="price-table__footnote">{{ table.footnote }}</p>
  </div>
</template>

<style scoped>
.price-table {
  overflow-x: auto;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
}

.price-table table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  line-height: 1.4;
}

.price-table thead th {
  padding: 10px 12px;
  background: var(--color-header);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
  text-align: left;
  vertical-align: bottom;
  white-space: nowrap;
}

.price-table tbody td,
.price-table tbody th {
  padding: 9px 12px;
  border-top: 1px solid var(--color-border);
  text-align: left;
  vertical-align: top;
}

.price-table tbody td:first-child {
  min-width: 220px;
}

.price-table tbody tr.price-table__row:hover td {
  background: #f8fafc;
}

.price-table .is-numeric {
  text-align: right !important;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

.price-table .is-muted {
  color: var(--color-text-muted);
}

/* Полноширинный заголовок группы */
.price-table__group th {
  background: var(--color-group-bg);
  color: var(--color-text);
  font-weight: 600;
  font-size: 13px;
}

/* Примечание группы (например, условия цены за комплект) */
.price-table__note td {
  background: #fffbeb;
  color: #92400e;
  font-size: 12.5px;
  font-style: italic;
}

.price-table__footnote {
  margin: 0;
  padding: 10px 14px;
  border-top: 1px solid var(--color-border);
  background: var(--color-group-bg);
  color: var(--color-text-muted);
  font-size: 13px;
}

/* ─── Печать: компактная таблица без заливок, влезает в страницу ──────── */
@media print {
  .price-table {
    overflow: visible; /* в печати скролл обрезает контент — отдаём таблице всю ширину */
    border: 1px solid #9ca3af;
    border-radius: 0;
  }

  .price-table table {
    font-size: 9px;
    line-height: 1.25;
  }

  .price-table thead th {
    background: #f3f4f6;
    color: #111827;
    font-size: 8.5px;
    padding: 4px 5px;
    white-space: normal; /* длинные заголовки колонок переносятся */
  }

  .price-table tbody td,
  .price-table tbody th {
    padding: 3px 5px;
  }

  .price-table tbody td:first-child {
    min-width: 0;
  }

  /* Заголовок группы — светлая заливка без зависания от print-color-adjust */
  .price-table__group th {
    background: #f3f4f6;
    color: #111827;
    font-size: 9px;
  }

  /* Примечание группы — вместо жёлтой заливки левая линия */
  .price-table__note td {
    background: #ffffff;
    border-left: 2px solid #d97706;
    color: #92400e;
    font-size: 8.5px;
  }

  .price-table__footnote {
    background: #ffffff;
    color: #374151;
    font-size: 9px;
    padding: 5px 6px;
  }

  /* Строку не разрывать между страницами; thead повторяется автоматически */
  .price-table tbody tr {
    break-inside: avoid;
  }
}
</style>
