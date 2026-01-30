<template>
  <div>
    {{ displayedText }}
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onUnmounted } from 'vue'

interface Props {
  text: string
  speed?: number
  pauseTime?: number
  isInfinite?: boolean
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  speed: 100,
  pauseTime: 2000,
  isInfinite: true,
  delay: 0
})

const displayedText = ref('')
const currentIndex = ref(0)
let typingInterval: ReturnType<typeof setInterval> | null = null
let pauseTimeout: ReturnType<typeof setTimeout> | null = null
let delayTimeout: ReturnType<typeof setTimeout> | null = null

const startTyping = () => {
  if (props.delay > 0) {
    delayTimeout = setTimeout(() => {
      typeCharacter()
    }, props.delay)
  } else {
    typeCharacter()
  }
}

const typeCharacter = () => {
  if (currentIndex.value < props.text.length) {
    displayedText.value = props.text.substring(0, currentIndex.value + 1)
    currentIndex.value++

    typingInterval = setTimeout(() => {
      typeCharacter()
    }, props.speed)
  } else {
    // Complete text displayed
    if (props.isInfinite) {
      pauseTimeout = setTimeout(() => {
        resetTyping()
      }, props.pauseTime)
    }
  }
}

const resetTyping = () => {
  displayedText.value = ''
  currentIndex.value = 0
  startTyping()
}

// Watch for text changes and restart animation
watch(() => props.text, () => {
  if (typingInterval) {
    clearTimeout(typingInterval)
  }

  if (pauseTimeout) {
    clearTimeout(pauseTimeout)
  }

  if (delayTimeout) {
    clearTimeout(delayTimeout)
  }

  resetTyping()
}, { immediate: true })

onUnmounted(() => {
  if (typingInterval) {
    clearTimeout(typingInterval)
  }

  if (pauseTimeout) {
    clearTimeout(pauseTimeout)
  }

  if (delayTimeout) {
    clearTimeout(delayTimeout)
  }
})
</script>

<style scoped>
.typewriter-text {
  white-space: pre-wrap;
  word-break: break-word;
}

.typewriter-cursor {
  display: inline-block;
  animation: blink 1s infinite;
  font-weight: bold;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* Optional hover effect */
.typewriter-container:hover .typewriter-cursor {
  animation-play-state: paused;
}
</style>
