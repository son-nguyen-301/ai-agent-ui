<template>
  <div>
    {{ displayedText }}
  </div>
</template>

<script lang="ts" setup>
type Props = {
  /**
   * The text that need to be typed.
   */
  text: string
  /**
   * The speed of the typing animation.
   */
  speed?: number
  /**
   * The time to pause between each loop of the typing animation.
   */
  pauseTime?: number
  /**
   * Whether the typing animation should loop infinitely.
   */
  isInfinite?: boolean
  /**
   * The delay before the typing animation starts.
   */
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  speed: 100,
  pauseTime: 2000,
  isInfinite: true,
  delay: 0
})

/**
 * The text that is displayed.
 */
const displayedText = ref('')
/**
 * The current index of the text that is displayed.
 */
const currentIndex = ref(0)

/**
 * The interval for the typing animation.
 */
const typingInterval = ref<ReturnType<typeof setInterval> | null>(null)
/**
 * The timeout for the pause between each loop of the typing animation.
 */
const pauseTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
/**
 * The timeout for the delay before the typing animation starts.
 */
const delayTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const startTyping = () => {
  if (props.delay <= 0) {
    typeCharacter()

    return
  }

  delayTimeout.value = setTimeout(typeCharacter, props.delay)
}

const typeCharacter = () => {
  if (currentIndex.value >= props.text.length) {
    // Complete text displayed
    if (props.isInfinite) {
      pauseTimeout.value = setTimeout(resetTyping, props.pauseTime)
    }

    return
  }

  displayedText.value = props.text.substring(0, currentIndex.value + 1)
  currentIndex.value++

  typingInterval.value = setTimeout(typeCharacter, props.speed)
}

const resetTyping = () => {
  displayedText.value = ''
  currentIndex.value = 0
  startTyping()
}

// Watch for text changes and restart animation
watch(() => props.text, () => {
  if (typingInterval.value) {
    clearTimeout(typingInterval.value)
  }

  if (pauseTimeout.value) {
    clearTimeout(pauseTimeout.value)
  }

  if (delayTimeout.value) {
    clearTimeout(delayTimeout.value)
  }

  resetTyping()
}, { immediate: true })

onUnmounted(() => {
  if (typingInterval.value) {
    clearTimeout(typingInterval.value)
  }

  if (pauseTimeout.value) {
    clearTimeout(pauseTimeout.value)
  }

  if (delayTimeout.value) {
    clearTimeout(delayTimeout.value)
  }
})
</script>
