// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/scripts',
    '@nuxt/test-utils/module',
    '@pinia/nuxt',
    'nuxt-charts'
  ],

  $development: {
    runtimeConfig: {
      public: {
        isAnimationEnabled: true
      }
    }
  },

  $production: {
    runtimeConfig: {
      public: {
        isAnimationEnabled: true
      }
    }
  },

  $test: {
    runtimeConfig: {
      public: {
        isAnimationEnabled: false
      }
    }
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  typescript: {
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        strict: true
      }
    },
    nodeTsConfig: {
      compilerOptions: {
        strict: true
      }
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
