<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui'

type Props = {
  title: string
  data: SalesData[]
}

defineProps<Props>()

/**
 * Map the data properties to the table column names.
 */
const columns: TableColumn<SalesData>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'title',
    header: 'Title'
  },
  {
    accessorKey: 'platform',
    header: 'Platform'
  },
  {
    accessorKey: 'price',
    header: 'Price'
  },
  {
    accessorKey: 'discount',
    header: 'Discount'
  },
  {
    accessorKey: 'purchaseDate',
    header: 'Purchase Date'
  },
  {
    accessorKey: 'customer',
    header: 'Customer'
  }
]
</script>

<template>
  <WidgetCard
    :title="title"
    should-have-no-padding
  >
    <UTable
      :data
      :columns
    />
  </WidgetCard>
</template>
