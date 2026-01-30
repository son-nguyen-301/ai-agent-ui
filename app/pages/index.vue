<script setup lang="ts">
const { startConversation, sendMessage, isAgentThinking } = useChat()
const conversationsStore = useMyConversationsStore()

const prompt = ref<string>('')

if (!conversationsStore.conversations.length) {
  startConversation()
}

const submitPrompt = () => {
  sendMessage(prompt.value)
  prompt.value = ''
}

const widgetData = computed(() => {
  if (!conversationsStore.lastAgentMessage) {
    return null
  }

  if (conversationsStore.lastAgentMessage.action?.type === 'render_widget') {
    return conversationsStore.lastAgentMessage.action
  }

  return null
})
</script>

<template>
  <UDashboardGroup>
    <AppChatPanel
      v-model:prompt="prompt"
      :conversation="conversationsStore.activeConversation"
      :is-agent-thinking="isAgentThinking"
      @prompt-submitted="submitPrompt"
    />

    <AppDynamicWidgetPanel :widget-data="widgetData" />
  </UDashboardGroup>
</template>
