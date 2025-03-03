<script setup lang="ts">
import { VcSwitch } from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

import type { NotificationChannel } from '@/client'
import type { SettingNotificationPreference } from '@/models/setting/notification/settingNotification.model.ts'
import { SettingNotificationChannelEnumUtil } from '@/models/setting/notification/settingNotificationChannel.model.ts'
import type {
  SettingNotificationUpdateGlobalForm,
} from '@/models/setting/notification/settingNotificationGlobalUpdateForm.model.ts'

const props = defineProps<{
  channels: NotificationChannel[]
  preference: SettingNotificationPreference
}>()

const emit = defineEmits<{
  update: [form: SettingNotificationUpdateGlobalForm]
}>()

const i18n = useI18n()

function isEnabled(channel: NotificationChannel): boolean {
  return props.preference.global[channel]
}

function onUpdate(isEnabled: boolean, channel: NotificationChannel): void {
  emit('update', {
    isEnabled,
    channel,
  })
}
</script>

<template>
  <div
    class="sticky top-0 z-2 col-span-full grid grid-cols-subgrid border-b border-solid border-secondary"
  >
    <div
      class="sticky left-0 z-1 flex bg-primary items-center gap-2 border-r border-solid border-secondary p-3 px-6 text-sm text-secondary"
    >
      <span>
        {{ i18n.t('shared.global') }}
      </span>
    </div>
    <div
      v-for="channel of props.channels"
      :key="channel"
      class="border-r border-solid border-secondary last:border-none"
    >
      <div class="flex items-center flex-col justify-center gap-4 text-nowrap p-3 px-6 text-secondary">
        <span class="text-xs">
          {{ i18n.t(SettingNotificationChannelEnumUtil.getI18nKey(channel)) }}
        </span>

        <VcSwitch
          :model-value="isEnabled(channel)"
          size="sm"
          @update:model-value="(event) => onUpdate(event, channel)"
        />
      </div>
    </div>
  </div>
</template>
