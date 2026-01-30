# AI Agent UI

A modern, interactive AI agent interface built with Nuxt 4, featuring dynamic widget rendering, chat-based interactions, and data visualization capabilities.

## 📋 Table of Contents

- [Project Overview](#🎯-project-overview)
- [Features](#✨-features)
- [Tech Stack](#🛠-tech-stack)
- [Project Structure](#📁-project-structure)
- [Prerequisites](#📦-prerequisites)
- [Getting Started](#🚀-getting-started)
- [Development](#💻-development)
- [E2E Testing](#🧪-e2e-testing)
- [Building for Production](#🏗-building-for-production)
- [Available Scripts](#📜-available-scripts)
- [Architecture](#🏛-architecture)

## 🎯 Project Overview

AI Agent UI is a conversational interface that allows users to interact with an AI agent through natural language. The agent can understand user queries and dynamically render appropriate widgets (charts, tables, etc.) to visualize data:

- **Chat-based interaction**: Natural language conversations with the AI agent
- **Dynamic widget rendering**: Context-aware visualization components
- **Multiple AI model support**: Switch between different AI models (GPT-4o, Gemini 2.5 Flash, Llama 3.1 8B, Claude 3.5 Sonnet)
- **Real-time responses**: Typewriter animation effects for a polished user experience

## ✨ Features

- 💬 **Interactive Chat Interface**: Clean, modern chat UI with message history
- 📊 **Dynamic Widget System**: Automatically renders charts and tables based on user queries
- 🤖 **AI Model Selection**: Choose from multiple AI models via dropdown
- 🎨 **Smooth Animations**: Typewriter effects and fade transitions
- 🧪 **E2E Testing**: Comprehensive end-to-end tests using Vitest and Playwright
- 🔒 **Type Safety**: Full TypeScript support with strict mode

## 🛠 Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com/) - The Intuitive Vue Framework
- **UI Library**: [Nuxt UI](https://ui.nuxt.com/) - Fully styled and customizable components
- **State Management**: [Pinia](https://pinia.vuejs.org/) - The Vue Store that you will enjoy using
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Charts**: [Nuxt Charts](https://nuxt-charts.vercel.app/) - Data visualization libraries
- **Testing**: 
  - [Vitest](https://vitest.dev/) - Fast unit test framework
  - [@nuxt/test-utils](https://nuxt.com/modules/test-utils) - Nuxt testing utilities
  - [Playwright Core](https://playwright.dev/) - Browser automation for E2E tests
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager

## 📁 Project Structure

```
ai-agent-ui/
├── app/
│   ├── components/          # Vue components
│   │   ├── AppChatPanel.vue          # Main chat interface
│   │   ├── AppDynamicWidgetPanel.vue # Dynamic widget container
│   │   ├── SalesChart.vue            # Sales chart widget
│   │   ├── SalesDataTable.vue        # Sales data table widget
│   │   ├── TypewriterAnimation.vue   # Typewriter effect component
│   │   └── ...
│   ├── composables/         # Vue composables
│   │   ├── useAgent.ts      # AI agent logic
│   │   └── useChat.ts       # Chat functionality
│   ├── pages/               # Nuxt pages
│   │   └── index.vue        # Main page
│   ├── stores/              # Pinia stores
│   │   └── conversations.ts # Conversation state management
│   ├── test/
│   │   └── e2e/             # E2E tests
│   │       └── ai-agent.spec.ts
│   └── assets/              # Static assets
│       └── css/
│           └── main.css
├── shared/                  # Shared code
│   ├── constants/           # Application constants
│   │   ├── ai-models.ts     # AI model definitions
│   │   └── sales.ts         # Sales data constants
│   └── types/               # TypeScript type definitions
│       ├── ai-models.ts
│       ├── conversations.ts
│       └── sales.ts
├── public/                  # Public static files
├── nuxt.config.ts           # Nuxt configuration
├── vitest.config.ts        # Vitest configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 22 or higher ([Download](https://nodejs.org/))
- **pnpm**: Version 10.28.2 or higher ([Installation Guide](https://pnpm.io/installation))

You can verify your installations:

```bash
node --version  # Should be v22.x or higher
pnpm --version  # Should be 10.28.2 or higher
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-agent-ui
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all project dependencies and run `nuxt prepare` automatically (via the `postinstall` script).

### 3. Start the Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000` (or the next available port).

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 💻 Development

### Development Server

Run the development server with hot-reload:

```bash
pnpm dev
```

The server will automatically reload when you make changes to the code.

### Code Quality

#### Linting

Check code quality and style:

```bash
pnpm lint
```

The project uses ESLint with Nuxt's recommended configuration and custom stylistic rules:
- No trailing commas
- 1TBS brace style

#### Type Checking

Verify TypeScript types:

```bash
pnpm typecheck
```

This runs Nuxt's type checker with strict mode enabled.

## 🧪 E2E Testing

This project uses Vitest with `@nuxt/test-utils` and Playwright Core for end-to-end testing.

### Setup for E2E Testing

1. **Install Playwright Browsers** (if not already installed):

   The project uses `playwright-core`, which requires you to install browser binaries separately:

   ```bash
   npx playwright-core install
   ```

2. **Run E2E Tests**:

   ```bash
   pnpm test
   ```

   Or with the Vitest UI:

   ```bash
   pnpm test:ui
   ```

### E2E Test Configuration

The E2E tests are configured in `vitest.config.ts`:

- **Environment**: `nuxt` - Uses Nuxt's test environment
- **Test Timeout**: 60 seconds
- **Test Location**: `app/test/e2e/`

### Writing E2E Tests

E2E tests use `@nuxt/test-utils` which provides:

- `setup()` - Initialize the Nuxt test environment
- `createPage()` - Create a Playwright page instance
- `url()` - Get the test server URL

Example test structure:

```typescript
import { createPage, setup, url } from '@nuxt/test-utils/e2e'
import { describe, test, expect } from 'vitest'

describe('Feature Name', async () => {
  await setup()

  test('should do something', async () => {
    const page = await createPage()
    await page.goto(url('/'), { waitUntil: 'hydration' })
    
    // Your test assertions here
  })
})
```

### Current E2E Test Coverage

The project includes comprehensive E2E tests covering:

1. **Widget Rendering**: Tests that widgets are correctly displayed based on user prompts
2. **Chat Functionality**: Verifies message sending and receiving
3. **AI Model Selection**: Tests the model dropdown functionality
4. **Error Handling**: Tests generic responses for unsupported queries

### Running Specific Tests

Run a specific test file:

```bash
pnpm test app/test/e2e/ai-agent.spec.ts
```

## 🏗 Building for Production

### Build

Create a production build:

```bash
pnpm build
```

The build output will be in the `.output` directory.

### Preview Production Build

Preview the production build locally:

```bash
pnpm preview
```

This starts a local server with the production build.

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with hot-reload |
| `pnpm build` | Build the application for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint to check code quality |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm test` | Run E2E tests with Vitest |
| `pnpm test:ui` | Run tests with Vitest UI |

## 🏛 Architecture

### Component Architecture

- **AppChatPanel**: Main chat interface component that handles user input and displays conversation history
- **AppDynamicWidgetPanel**: Container component that dynamically renders widgets based on agent actions
- **Widget Components**: Specialized components (SalesChart, SalesDataTable) that visualize data

### State Management

The application uses Pinia for state management:

- **conversationsStore**: Manages conversation state, active conversation, and message history

### Composables

- **useAgent**: Handles AI agent interactions and message processing
- **useChat**: Provides chat functionality, message sending, and conversation management

### Data Flow

1. User submits a message via `AppChatPanel`
2. Message is processed by `useChat` composable
3. `useAgent` sends the message and receives a response
4. Response may include an action to render a widget
5. `AppDynamicWidgetPanel` renders the appropriate widget component
6. State is updated in the `conversationsStore`

### Widget System

The widget system supports dynamic rendering based on agent actions:

- **SalesChart**: Renders when user asks for sales overview
- **SalesDataTable**: Renders when user asks for sales data in table format

Widgets are lazily loaded and animated with fade transitions for a smooth user experience.

## 🎨 Configuration

### Runtime Configuration

The application uses Nuxt's runtime config for environment-specific settings:

- **isAnimationEnabled**: Controls whether animations (typewriter effects) are enabled
  - `true` in development and production
  - `false` in test environment

### Route Rules

- Home route (`/`) is prerendered for better performance

### TypeScript

- Strict mode enabled
- Type checking runs on build and can be verified with `pnpm typecheck`

### Code Style

- Follow the existing code style
- Use TypeScript for all new code
- Write meaningful commit messages
- Ensure all tests pass before submitting

## 📄 License

See the [LICENSE](LICENSE) file for details.

## 🔗 Additional Resources

- [Nuxt Documentation](https://nuxt.com/docs)
- [Nuxt UI Documentation](https://ui.nuxt.com/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Pinia Documentation](https://pinia.vuejs.org/)
