import { AIModelKey, type AIModel } from '@@/shared/types/ai-models'

export const AI_MODELS: AIModel[] = [
  {
    key: AIModelKey.GPT_4o,
    name: 'GPT-4o',
    icon: 'i-simple-icons:openai'
  },
  {
    key: AIModelKey.GEMINI_2_5_FLASH,
    name: 'Gemini 2.5 Flash',
    icon: 'i-simple-icons:googlegemini'
  },
  {
    key: AIModelKey.LLAMA_3_1_8B,
    name: 'Llama 3.1 8B',
    icon: 'i-simple-icons:ollama'
  },
  {
    key: AIModelKey.CLAUDE_3_5_SONNET,
    name: 'Claude 3.5 Sonnet',
    icon: 'i-simple-icons:anthropic'
  }
]
