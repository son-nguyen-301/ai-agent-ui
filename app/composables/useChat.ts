export const useChat = () => {
  const conversationsStore = useMyConversationsStore()
  const { prompt, isThinking } = useAgent()
  const toast = useToast()

  const selectedModel = ref<AIModelKey>(AIModelKey.GPT_4o)

  const startConversation = () => {
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      messages: []
    }

    conversationsStore.conversations.push(newConversation)

    conversationsStore.activeConversationId = newConversation.id
  }

  const sendMessage = async (message: string) => {
    const userMessage: ConversationUserMessagePayload = {
      message
    }

    // Add the user message to the active conversation
    conversationsStore.updateActiveConversation(userMessage)

    // Send the message to the agent and get the reply
    const reply = await prompt(message).catch((error) => {
      toast.add({
        title: 'Error',
        description: error.message,
        color: 'error'
      })
    })

    // Early return if the reply is null or there is no active conversation
    if (!reply || !conversationsStore.activeConversationId) {
      return
    }

    // Add the reply to the active conversation
    conversationsStore.updateActiveConversation(reply)
  }
  return {
    startConversation,
    sendMessage,
    isAgentThinking: isThinking,
    selectedModel
  }
}
