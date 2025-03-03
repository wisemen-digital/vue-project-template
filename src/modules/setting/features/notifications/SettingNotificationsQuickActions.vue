<script setup lang="ts">
import type { Icon } from '@wisemen/vue-core'
import { VcIcon } from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppUnstyledButton from '@/components/app/AppUnstyledButton.vue'

const props = defineProps<{
  selectedAction: string
}>()

const emit = defineEmits<{
  select: [value: string]
}>()

interface QuickAction {
  id: 'all' | 'custom' | 'default' | 'none'
  title: string
  color: string
  description: string
  icon: Icon
}

const i18n = useI18n()

const actions = computed<QuickAction[]>(() => {
  return [
    {
      id: 'all',
      title: i18n.t('module.setting.notifications.all.title'),
      color: 'green',
      description: i18n.t('module.setting.notifications.all.description'),
      icon: 'bellArrow',
    },
    {
      id: 'default',
      title: i18n.t('module.setting.notifications.default.title'),
      color: 'yellow',
      description: i18n.t('module.setting.notifications.default.description'),
      icon: 'bell',
    },
    {
      id: 'custom',
      title: i18n.t('module.setting.notifications.custom.title'),
      color: 'blue',
      description: i18n.t('module.setting.notifications.custom.description'),
      icon: 'settings',
    },
    {
      id: 'none',
      title: i18n.t('module.setting.notifications.none.title'),
      color: 'red',
      description: i18n.t('module.setting.notifications.none.description'),
      icon: 'bellSlash',
    },
  ]
})

function onClick(id: string): void {
  emit('select', id)
}

function isSelected(id: string): boolean {
  return props.selectedAction === id
}
</script>

<template>
  <div class="grid gap-lg grid-cols-4">
    <AppUnstyledButton
      v-for="action in actions"
      :key="action.id"
      :class="{
        'bg-gradient-to-b from-brand-gradient-from to-brand-gradient-to': isSelected(action.id),
        'bg-primary': !isSelected(action.id),
      }"
      class="flex hover:border-brand flex-col gap-sm text-left p-lg border rounded-lg border-secondary"
      @click="onClick(action.id)"
    >
      <div
        :class="{
          'bg-brand-200 text-brand-600': action.color === 'blue',
          'bg-success-200 text-success-600': action.color === 'green',
          'bg-warning-200 text-warning-600': action.color === 'yellow',
          'bg-error-200 text-error-600': action.color === 'red',
        }"
        class="flex items-center w-min justify-center p-md rounded-full"
      >
        <VcIcon
          :icon="action.icon"
          class="size-4"
        />
      </div>
      <h3
        :class="{
          'text-primary-on-brand': isSelected(action.id),
          'text-placeholder': !isSelected(action.id),
        }"
        class="font-semibold text-sm"
      >
        {{ action.title }}
      </h3>
      <p
        :class="{
          'text-primary-on-brand dark:text-primary': isSelected(action.id),
          'text-tertiary': !isSelected(action.id),
        }"
        class="text-sm"
      >
        {{ action.description }}
      </p>
    </AppUnstyledButton>
  </div>
</template>
