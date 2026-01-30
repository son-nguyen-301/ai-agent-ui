<script lang="ts" setup>
type Props = {
  widgetData?: ConversationAgentReplyActionSalesChart | ConversationAgentReplyActionSalesDataTable | null
}

defineProps<Props>()
</script>

<template>
  <UDashboardPanel>
    <template
      v-if="widgetData"
      #body
    >
      <FadeTransition>
        <LazySalesChart
          v-if="widgetData.component === 'SalesChart'"
          :title="widgetData.props.title"
          :data="widgetData.props.data"
        />

        <LazySalesDataTable
          v-if="widgetData.component === 'SalesDataTable'"
          :title="widgetData.props.title"
          :data="widgetData.props.data"
        />
      </FadeTransition>
    </template>
  </UDashboardPanel>
</template>
