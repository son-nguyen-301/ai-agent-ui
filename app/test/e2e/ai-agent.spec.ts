import { createPage, setup, url } from '@nuxt/test-utils/e2e'
import { describe, test, expect } from 'vitest'

describe('AI Agent', async () => {
  await setup()

  test('should show correct widget when user prompt for data visualization', async () => {
    const page = await createPage()

    await page.goto(url('/'), { waitUntil: 'hydration' })

    // Check if the empty panel is visible
    const emptyPanel = page.getByTestId('app-dynamic-widget-panel-empty')

    expect(await emptyPanel.isVisible()).toBe(true)

    // Assert the chat panel
    const promptInput = page.getByTestId('app-chat-panel-prompt-input')

    expect(await promptInput.isVisible()).toBe(true)

    // Assert the prompt for sales chart
    await promptInput.fill('Show me the sales data')

    await page.keyboard.press('Enter')

    const thinkingMessage = page.getByTestId('app-chat-panel-message-assistant-thinking')

    expect(await thinkingMessage.isVisible()).toBe(true)

    const firstUserMessage = await page.getByTestId('app-chat-panel-message-user-0').textContent()

    expect(firstUserMessage).toBe('Show me the sales data')

    // Wait for the thinking message to disappear
    await thinkingMessage.waitFor({ state: 'detached' })

    expect(await emptyPanel.isVisible()).toBe(false)

    const firstAssistantMessage = await page.getByTestId('app-chat-panel-message-assistant-1').textContent()

    expect(firstAssistantMessage).toBe('Here is the sales overview...')

    const salesChart = page.getByTestId('app-dynamic-widget-panel-sales-chart')

    expect(await salesChart.isVisible()).toBe(true)

    // Assert the prompt for sales data table
    await promptInput.fill('Can you show me the sales data in a table?')

    await page.keyboard.press('Enter')

    expect(await thinkingMessage.isVisible()).toBe(true)

    const secondUserMessage = await page.getByTestId('app-chat-panel-message-user-2').textContent()

    expect(secondUserMessage).toBe('Can you show me the sales data in a table?')

    await thinkingMessage.waitFor({ state: 'detached' })

    const secondAssistantMessage = await page.getByTestId('app-chat-panel-message-assistant-3').textContent()

    expect(secondAssistantMessage).toBe('Sure, switching to list view.')

    const salesDataTable = page.getByTestId('app-dynamic-widget-panel-sales-data-table')

    await salesDataTable.waitFor({ state: 'visible', timeout: 2000 })

    expect(await salesDataTable.isVisible()).toBe(true)
  })

  test('should reply with a generic message if the user asks for something else', async () => {
    const page = await createPage()

    await page.goto(url('/'), { waitUntil: 'hydration' })

    const promptInput = page.getByTestId('app-chat-panel-prompt-input')

    await promptInput.fill('What is the weather in Tokyo?')

    await page.keyboard.press('Enter')

    const firstUserMessage = await page.getByTestId('app-chat-panel-message-user-0').textContent()

    const thinkingMessage = page.getByTestId('app-chat-panel-message-assistant-thinking')

    expect(await thinkingMessage.isVisible()).toBe(true)

    expect(firstUserMessage).toBe('What is the weather in Tokyo?')

    await thinkingMessage.waitFor({ state: 'detached' })

    const firstAssistantMessage = await page.getByTestId('app-chat-panel-message-assistant-1').textContent()

    expect(firstAssistantMessage).toBe('I\'m sorry, I can\'t help with that. Please try again.')

    const emptyPanel = page.getByTestId('app-dynamic-widget-panel-empty')

    expect(await emptyPanel.isVisible()).toBe(true)
  })

  test('should be able to select different AI models', async () => {
    const page = await createPage()

    await page.goto(url('/'), { waitUntil: 'hydration' })

    const modelSelectButton = page.getByTestId('app-chat-panel-model-select-button')

    expect(await modelSelectButton.textContent()).toBe('GPT-4o')

    await modelSelectButton.click()

    const gemini25FlashIcon = page.getByTestId('app-chat-panel-model-dropdown-item-icon-gemini-2.5-flash')

    await gemini25FlashIcon.waitFor({ state: 'visible', timeout: 2000 })

    expect(await gemini25FlashIcon.isVisible()).toBe(true)

    await gemini25FlashIcon.click()

    expect(await modelSelectButton.textContent()).toBe('Gemini 2.5 Flash')
  })
})
