<script lang="ts" setup>
type Props = {
  title: string
  data: SalesChartData[]
}

const props = defineProps<Props>()

/**
 * Map the `value` key to `Sales` for the chart legend.
 */
const categories = computed(() => ({
  value: {
    name: 'Sales'
  }
}))

/**
 * Format the x-axis labels to display the month name.
 */
const xFormatter = (index: number) => props.data[index]?.month ?? ''
</script>

<template>
  <WidgetCard :title="title">
    <BarChart
      :data="data"
      :height="300"
      :categories="categories"
      :y-axis="['value']"
      :x-num-ticks="6"
      :radius="4"
      :y-grid-line="true"
      :x-formatter="xFormatter"
      :legend-position="LegendPosition.TopRight"
      :hide-legend="false"
    />
  </WidgetCard>
</template>
