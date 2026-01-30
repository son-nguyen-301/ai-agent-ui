<template>
  <div>
    {{ displayedText }}
  </div>
</template>

<script lang="ts" setup>
type Props = {
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

const typingInterval = ref<ReturnType<typeof setInterval> | null>(null)
const pauseTimeout = ref<ReturnType<typeof setTimeout> | null>(null)
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
