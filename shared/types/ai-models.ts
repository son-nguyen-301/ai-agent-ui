export enum AIModelKey {
  GPT_4o = 'gpt-4o',
  GEMINI_2_5_FLASH = 'gemini-2.5-flash',
  LLAMA_3_1_8B = 'llama-3.1-8b',
  CLAUDE_3_5_SONNET = 'claude-3.5-sonnet'
}

export type AIModel = {
  key: AIModelKey
  name: string
  icon: string
}
