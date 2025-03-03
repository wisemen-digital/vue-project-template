<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { computed, ref } from 'vue'

import {
  NotificationChannel,
  NotificationType,
} from '@/client'
import type {
  SettingNotification,
  SettingNotificationPreference,
} from '@/models/setting/notification/settingNotification.model.ts'
import type { SettingNotificationDefaults } from '@/models/setting/notification/settingNotificationDefaults.model.ts'
import type {
  SettingNotificationUpdateGlobalForm,
} from '@/models/setting/notification/settingNotificationGlobalUpdateForm.model.ts'
import type { SettingNotificationUpdateForm } from '@/models/setting/notification/settingNotificationUpdateForm.model.ts'
import SettingNotificationsTableBody
  from '@/modules/setting/features/components/notifications/SettingNotificationsTableBody.vue'
import SettingNotificationsTableHeader
  from '@/modules/setting/features/components/notifications/SettingNotificationsTableHeader.vue'

const props = defineProps<{
  defaults: SettingNotificationDefaults[]
  preference: SettingNotificationPreference
}>()

const emit = defineEmits<{
  update: [form: SettingNotificationUpdateForm]
  updateGlobal: [form: SettingNotificationUpdateGlobalForm]
}>()

const tableScrollContainerRef = ref<HTMLElement | null>(null)

const scroll = useScroll(tableScrollContainerRef)

const isTableScrolledToBottom = computed<boolean>(() => {
  const canScroll = !scroll.arrivedState.bottom || !scroll.arrivedState.top

  if (!canScroll) {
    return false
  }

  return scroll.arrivedState.bottom
})

const channels = Object.values(NotificationChannel)

const gridColsStyle = computed<string>(() => {
  return `10rem ${channels.map(() => `minmax(8rem, auto)`).join(' ')}`
})

const notifications = computed<SettingNotification[]>(() => {
  const result: SettingNotification[] = []

  Object.values(NotificationType).forEach((type): void => {
    const notification = type.split('.')

    const key = notification[0]

    const notificationKey = result.find((item) => item.key === key) ?? null

    if (notificationKey === null) {
      result.push({
        actions: [
          type,
        ],
        key,
      })
    }
    else {
      notificationKey.actions.push(type)
    }
  })

  return result
})

function onUpdate(form: SettingNotificationUpdateForm): void {
  emit('update', form)
}

function onUpdateGlobal(form: SettingNotificationUpdateGlobalForm): void {
  emit('updateGlobal', form)
}
</script>

<template>
  <div class="flex flex-1 flex-col w-full overflow-hidden">
    <div
      ref="tableScrollContainerRef"
      :style="{
        gridTemplateColumns: gridColsStyle,
      }"
      class="grid overflow-auto"
    >
      <SettingNotificationsTableHeader
        :preference="props.preference"
        :channels="channels"
        @update="onUpdateGlobal"
      />

      <SettingNotificationsTableBody
        :channels="channels"
        :defaults="props.defaults"
        :preference="props.preference"
        :notifications="notifications"
        :is-table-scrolled-to-bottom="isTableScrolledToBottom"
        @update="onUpdate"
      />
    </div>
  </div>
</template>
