<script setup lang="ts">
import { AI_MODELS } from '@@/shared/constants/ai-models'

const { startConversation, sendMessage, isAgentThinking, selectedModel } = useChat()
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
      v-model:selected-model-key="selectedModel"
      :conversation="conversationsStore.activeConversation"
      :is-agent-thinking="isAgentThinking"
      :models="AI_MODELS"
      @prompt-submitted="submitPrompt"
    />

    <AppDynamicWidgetPanel :widget-data="widgetData" />
  </UDashboardGroup>
</template>
