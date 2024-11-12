<script setup lang="ts">
import {
  AppIcon,
  type Icon,
  type Routes,
} from '@wisemen/vue-core'
import { useRouter } from 'vue-router'

import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'

const props = defineProps<{
  title: string
  description: string
  icon: Icon
  to: Routes[number]
}>()

const router = useRouter()

function onClick(): void {
  router.push(props.to)
}
</script>

<template>
  <AppUnstyledButton
    class="flex w-full flex-col gap-2 rounded-xl border border-secondary bg-secondary p-4 hover:bg-tertiary"
    @click="onClick"
  >
    <span class="flex items-center justify-start gap-2">
      <AppIcon
        :icon="props.icon"
      />
      <span class="truncate font-semibold">
        {{ props.title }}
      </span>
    </span>
    <span class="text-sm text-tertiary">
      {{ props.description }}
    </span>
  </AppUnstyledButton>
</template>
