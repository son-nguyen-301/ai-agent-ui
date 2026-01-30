import { SALES_CHART_DATA, SALES_DATA } from '@@/shared/constants/sales'

export const useAgent = () => {
  const isThinking = ref(false)

  const prompt = async (message: string) => {
    isThinking.value = true

    return new Promise<ConversationAgentReplyPayload>((resolve, reject) => {
      const timeout = setTimeout(() => {
        // Reject if the message is empty
        if (!message.trim()) {
          clearTimeout(timeout)
          isThinking.value = false

          return reject(new Error('Message is required'))
        }

        clearTimeout(timeout)
        isThinking.value = false

        // Return sales data table if the user asks for a list or table
        if (
          message.toLowerCase().includes('table')
          || message.toLowerCase().includes('list')
        ) {
          return resolve({
            message: 'Sure, switching to list view.',
            action: {
              type: 'render_widget',
              component: 'SalesDataTable',
              props: {
                title: 'Q3 Sales Data',
                data: SALES_DATA
              }
            }
          })
        }

        if (message.toLowerCase().includes('sales')) {
          // Return sales chart if the user asks for a general overview
          return resolve({
            message: 'Here is the sales overview...',
            action: {
              type: 'render_widget',
              component: 'SalesChart',
              props: {
                title: 'Q3 Sales',
                data: SALES_CHART_DATA
              }
            }
          })
        }

        // Return a generic response if the user asks for something else
        return resolve({
          message: 'I\'m sorry, I can\'t help with that. Please try again.',
          action: null
        })
      },
      Math.floor(Math.random() * 1800) + 200
      )
    })
  }

  return {
    isThinking,
    prompt
  }
}
