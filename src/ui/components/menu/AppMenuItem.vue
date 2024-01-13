<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'

import type { Icon } from '@/icons'

interface Props {
  isDanger?: boolean
  icon?: Icon
  isDisabled?: boolean
}

const {
  isDanger = false,
  isDisabled = false,
  icon,
} = defineProps<Props>()

const emit = defineEmits<{ (event: 'action'): void }>()
</script>

<template>
  <MenuItem
    v-slot="{ active, close }"
    :disabled="isDisabled"
    as="template"
  >
    <button
      :class="{
        'cursor-not-allowed opacity-50': isDisabled,
      }"
      :disabled="isDisabled"
      type="button"
      @click.prevent="
        emit('action')
        close()
      "
    >
      <div
        :class="{
          'bg-neutral-100': active,
        }"
        class="flex items-center justify-between gap-x-3 px-3 py-2"
        type="button"
      >
        <AppText
          :class="{
            'text-destructive': isDanger,
          }"
          variant="subtext"
        >
          <slot />
        </AppText>

        <AppIcon
          v-if="icon != null"
          :class="{
            'text-destructive': isDanger,
          }"
          :icon="icon"
          class="w-4"
        />
      </div>
    </button>
  </MenuItem>
</template>
