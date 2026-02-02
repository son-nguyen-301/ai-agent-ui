/**
 * Conversations store to manage the conversations and active conversation.
 */
export const useMyConversationsStore = defineStore('conversationsStore', () => {
  const conversations = ref<Conversation[]>([])
  const activeConversationId = ref<string | null>(null)

  const activeConversation = computed(() => {
    return conversations.value.find(conversation => conversation.id === activeConversationId.value)
  })

  const lastAgentMessage = computed(() => activeConversation.value?.messages
    .filter(message => ('action' in message))
    .filter(message => message.action !== null)
    .at(-1)
  )

  const updateActiveConversation = (
    /**
     * The message to update the active conversation with.
     */
    message: ConversationAgentReplyPayload | ConversationUserMessagePayload
  ) => {
    const conversationIndexToUpdate = conversations.value.findIndex(conversation => conversation.id === activeConversationId.value)

    // Early return if the conversation to update is not found
    if (conversationIndexToUpdate === -1) {
      return
    }

    // Early return if the conversation to update is not found
    if (!conversations.value[conversationIndexToUpdate]) {
      return
    }

    conversations.value[conversationIndexToUpdate] = {
      ...conversations.value[conversationIndexToUpdate],
      messages: [...conversations.value[conversationIndexToUpdate].messages, message]
    }
  }

  return {
    /**
     * User's conversations.
     */
    conversations,
    /**
     * The current conversation ID.
     */
    activeConversationId,
    /**
     * The current conversation.
     */
    activeConversation,
    /**
     * The last agent message that has an action.
     */
    lastAgentMessage,
    /**
     * Update the active conversation.
     */
    updateActiveConversation
  }
})
