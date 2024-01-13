<script setup lang="ts">
interface Props {
  title: string
}

const { title } = defineProps<Props>()
</script>

<template>
  <div class="flex w-full flex-1 flex-col">
    <AppContainer class="py-8">
      <AppText variant="title">
        {{ title }}
      </AppText>
    </AppContainer>

    <AppContainer class="flex flex-1 flex-col pb-8 pt-6">
      <slot />
    </AppContainer>
  </div>
</template>
