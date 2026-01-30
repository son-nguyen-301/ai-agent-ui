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
</script>

<template>
  <UDashboardGroup>
    <AppChatPanel
      v-model:prompt="prompt"
      :conversation="conversationsStore.activeConversation"
      :is-agent-thinking="isAgentThinking"
      @prompt-submitted="submitPrompt"
    />
    <AppDynamicWidgetPanel />
  </UDashboardGroup>
</template>
