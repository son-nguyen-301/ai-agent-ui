<script lang="ts" setup>
type Props = {
  widgetData?: ConversationAgentReplyActionSalesChart | ConversationAgentReplyActionSalesDataTable | null
}

defineProps<Props>()
</script>

<template>
  <UDashboardPanel>
    <template
      #body
    >
      <FadeTransition v-if="widgetData">
        <LazySalesChart
          v-if="widgetData.component === 'SalesChart'"
          :title="widgetData.props.title"
          :data="widgetData.props.data"
          data-testid="app-dynamic-widget-panel-sales-chart"
        />

        <LazySalesDataTable
          v-if="widgetData.component === 'SalesDataTable'"
          :title="widgetData.props.title"
          :data="widgetData.props.data"
          data-testid="app-dynamic-widget-panel-sales-data-table"
        />
      </FadeTransition>

      <UEmpty
        v-else
        title="Widget that contains data will be displayed here to help you visualize the data"
        description="You can ask the agent questions about the data in the widget"
        icon="i-heroicons-chart-bar"
        class="h-full flex items-center justify-center"
        data-testid="app-dynamic-widget-panel-empty"
      />
    </template>
  </UDashboardPanel>
</template>
