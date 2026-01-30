import type { SalesChartData, SalesData } from '@@/shared/types/sales'

export type ConversationAgentReplyActionType = 'render_widget'

export type ConversationAgentReplyActionSalesChart = {
  type: ConversationAgentReplyActionType
  component: 'SalesChart'
  props: {
    title: string
    data: SalesChartData[]
  }
}

export type ConversationAgentReplyActionSalesDataTable = {
  type: ConversationAgentReplyActionType
  component: 'SalesDataTable'
  props: {
    title: string
    data: SalesData[]
  }
}

export type ConversationAgentReplyPayload = {
  message: string
  action: ConversationAgentReplyActionSalesChart | ConversationAgentReplyActionSalesDataTable | null
}

export type ConversationUserMessagePayload = Pick<ConversationAgentReplyPayload, 'message'>

export type Conversation = {
  id: string
  messages: (ConversationAgentReplyPayload | ConversationUserMessagePayload)[]
}
