<script setup lang="ts">
import { AI_MODELS } from '@@/shared/constants/ai-models'

const { startConversation, sendMessage, isAgentThinking, selectedModel } = useChat()
const conversationsStore = useMyConversationsStore()
const toast = useToast()

const prompt = ref<string>('')

if (!conversationsStore.conversations.length) {
  startConversation()
}

/**
 * Submit the prompt to the agent.
 */
const submitPrompt = () => {
  // Early return if the agent is thinking to prevent multiple prompts from being sent
  if (isAgentThinking.value) {
    toast.add({
      title: 'Please wait for the agent to finish thinking',
      color: 'warning'
    })

    return
  }

  // Send the message to the agent
  sendMessage(prompt.value)
  prompt.value = ''
}

const widgetData = computed(() => {
  // Early return if there is no last agent message
  if (!conversationsStore.lastAgentMessage) {
    return null
  }

  // Return the widget data if the last agent message has an action to render a widget
  if (conversationsStore.lastAgentMessage.action?.type === 'render_widget') {
    return conversationsStore.lastAgentMessage.action
  }

  // Return null if the last agent message does not have an action to render a widget
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
