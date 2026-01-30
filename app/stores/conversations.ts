export const useMyConversationsStore = defineStore('conversationsStore', () => {
  const conversations = ref<Conversation[]>([])
  const activeConversationId = ref<string | null>(null)

  const activeConversation = computed(() => {
    return conversations.value.find(conversation => conversation.id === activeConversationId.value)
  })

  const updateActiveConversation = (
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
    conversations,
    activeConversationId,
    activeConversation,
    updateActiveConversation
  }
})
