<script lang="ts" setup>
import type { ChatMessageProps } from '@nuxt/ui'

type Props = {
  conversation?: Conversation
  isAgentThinking?: boolean
  models?: AIModel[]
}

type Emits = {
  'prompt-submitted': []
}

const prompt = defineModel<string>('prompt', { required: true })
const selectedModelKey = defineModel<AIModelKey>('selectedModelKey', { required: true })

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

const selectedModel = computed(() => props.models?.find(model => model.key === selectedModelKey.value))
const modelOptions = computed(() => props.models?.map(model => ({
  ...model,
  onSelect: () => selectedModelKey.value = model.key
})) ?? [])

const getMessageTextCharacters = (parts: ChatMessageProps['parts']) => parts
  .filter(part => part.type === 'text')
  .map(part => part.text).join('')
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
      <UChatPalette
        class="bg-black"
      >
        <UChatMessages should-auto-scroll>
          <UChatMessage
            v-for="item in messages"
            :id="item.id"
            :key="item.id"
            :parts="item.parts"
            :role="item.role"
            :side="item.role === 'assistant' ? 'left' : 'right'"
            :variant="item.role === 'assistant' ? 'subtle' : 'solid'"
          >
            <!-- Only apply the VueWriter component to assistant messages -->
            <template
              v-if="item.role === 'assistant'"
              #content
            >
              <TypewriterAnimation
                :text="getMessageTextCharacters(item.parts)"
                :speed="10"
                :is-infinite="false"
              />
            </template>
          </UChatMessage>

          <!-- Show a thinking message if the agent is thinking -->
          <UChatMessage
            v-if="isAgentThinking"
            id="thinking"
            key="thinking"
            role="assistant"
            side="left"
            variant="naked"
            :parts="[{ type: 'text', text: 'Thinking...' }]"
          >
            <template #content>
              <div class="flex items-center">
                Thinking
                <TypewriterAnimation
                  text="..."
                  :speed="150"
                  is-infinite
                  :pause-time="500"
                />
              </div>
            </template>
          </UChatMessage>
        </UChatMessages>

        <template #prompt>
          <UChatPrompt
            v-model="prompt"
            autofocus
            placeholder="How can I help you today?"
            @submit="emit('prompt-submitted')"
          >
            <UChatPromptSubmit
              class="rounded-full mr-2"
              color="neutral"
            />

            <template #footer>
              <UDropdownMenu
                :items="modelOptions"
                label-key="name"
                value-key="key"
              >
                <template #item-leading="{ item }">
                  <UIcon
                    :name="item.icon"
                    class="my-auto text-lg"
                  />
                </template>
                <UButton
                  class="ml-2 rounded-xl"
                  color="neutral"
                  size="lg"
                  variant="ghost"
                  :leading-icon="selectedModel?.icon"
                  trailing-icon="i-heroicons-chevron-down"
                  :ui="{
                    leadingIcon: 'text-gray-500',
                    trailingIcon: 'text-gray-500'
                  }"
                >
                  {{ selectedModel?.name }}
                </UButton>
              </UDropdownMenu>
            </template>
          </UChatPrompt>
        </template>
      </UChatPalette>
    </template>
  </UDashboardPanel>
</template>
