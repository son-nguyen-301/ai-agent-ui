<script lang="ts" setup>
type Props = {
  title: string
  shouldHaveNoPadding?: boolean
}

defineProps<Props>()
</script>

<template>
  <div>
    <h3 class="text-lg font-semibold mb-4">
      {{ title }}
    </h3>

    <UCard
      :ui="{
        body: shouldHaveNoPadding ? 'p-0 sm:p-0' : undefined
      }"
    >
      <slot />
    </UCard>
  </div>
</template>
