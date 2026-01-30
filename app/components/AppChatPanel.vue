<script lang="ts" setup>
import type { ChatMessageProps } from '@nuxt/ui'

type Props = {
  conversation?: Conversation
  isAgentThinking?: boolean
}

type Emits = {
  'prompt-submitted': []
}

const prompt = defineModel<string>('prompt', { required: true })

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const messages = computed<Pick<ChatMessageProps, 'id' | 'role' | 'parts'>[]>(() => props.conversation?.messages.map((item, index) => ({
  id: index.toString(),
  role: 'action' in item ? 'assistant' : 'user',
  parts: [
    {
      type: 'text',
      text: item.message
    }
  ]
})) ?? [])
</script>

<template>
  <UDashboardPanel
    resizable
    :default-size="30"
    :min-size="30"
    :max-size="50"
    :ui="{
      body: 'p-0 sm:p-0'
    }"
  >
    <template #header>
      <UDashboardNavbar title="Chat" />
    </template>

    <template #body>
      <UChatPalette class="bg-black">
        <UChatMessages>
          <UChatMessage
            v-for="item in messages"
            :id="item.id"
            :key="item.id"
            :parts="item.parts"
            :role="item.role"
            :side="item.role === 'assistant' ? 'left' : 'right'"
            :variant="item.role === 'assistant' ? 'subtle' : 'solid'"
          />

          <!-- Show a thinking message if the agent is thinking -->
          <UChatMessage
            v-if="isAgentThinking"
            id="thinking"
            key="thinking"
            role="assistant"
            side="left"
            variant="naked"
            :parts="[{ type: 'text', text: 'Thinking...' }]"
          />
        </UChatMessages>

        <template #prompt>
          <UChatPrompt
            v-model="prompt"
            autofocus
            placeholder="How can I help you today?"
            @submit="emit('prompt-submitted')"
          />
        </template>
      </UChatPalette>
    </template>
  </UDashboardPanel>
</template>
