<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import AppSeparator from '@/components/app/AppSeparator.vue'
import { useApiErrorToast } from '@/composables/api-error-toast/apiErrorToast.composable.ts'
import type { SettingNotificationPreference } from '@/models/setting/notification/settingNotification.model.ts'
import type { SettingNotificationDefaults } from '@/models/setting/notification/settingNotificationDefaults.model.ts'
import type {
  SettingNotificationUpdateGlobalForm,
} from '@/models/setting/notification/settingNotificationGlobalUpdateForm.model.ts'
import type { SettingNotificationUpdateForm } from '@/models/setting/notification/settingNotificationUpdateForm.model.ts'
import { useSettingNotificationPreferenceUpdateMutation } from '@/modules/setting/api/mutations/settingNotificationUpdate.mutation.ts'
import { useSettingNotificationGlobalUpdateMutation } from '@/modules/setting/api/mutations/settingNotificationUpdateGlobal.mutation.ts'
import { useSettingNotificationQuery } from '@/modules/setting/api/queries/settingNotification.query.ts'
import { useSettingNotificationDefaultsQuery } from '@/modules/setting/api/queries/settingNotificationDefaults.query.ts'
import type { SettingNavigation } from '@/modules/setting/composables/settingNavigation.composable.ts'
import SettingNotificationsQuickActions
  from '@/modules/setting/features/components/notifications/SettingNotificationsQuickActions.vue'
import SettingNotificationsTable
  from '@/modules/setting/features/components/notifications/SettingNotificationsTable.vue'
import SettingContainer from '@/modules/setting/features/components/SettingContainer.vue'

const props = defineProps<{
  navigation: SettingNavigation
}>()

const i18n = useI18n()

const apiErrorToast = useApiErrorToast()

const notificationQuery = useSettingNotificationQuery()

const updateMutation = useSettingNotificationPreferenceUpdateMutation()
const updateGlobalMutation = useSettingNotificationGlobalUpdateMutation()

const defaultsQuery = useSettingNotificationDefaultsQuery()

const preference = computed<SettingNotificationPreference>(() => {
  return notificationQuery.data.value ?? { appEnabled: false,
    global: {
      app: false,
      email: false,
      push: false,
      sms: false,
    },
    preferences: {
      app: [],
      email: [],
      push: [],
      sms: [],
    } }
})

const defaults = computed<SettingNotificationDefaults[]>(() => {
  return defaultsQuery.data.value ?? []
})

async function onUpdate(form: SettingNotificationUpdateForm): Promise<void> {
  try {
    await updateMutation.execute({
      body: form,
    })
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}

async function onGlobalUpdate(form: SettingNotificationUpdateGlobalForm): Promise<void> {
  try {
    await updateGlobalMutation.execute({
      body: form,
    })
  }
  catch (error) {
    apiErrorToast.show(error)
  }
}

const selectedAction = ref<string>('default')

function onQuickActionSelect(action: string): void {
  selectedAction.value = action
}
</script>

<template>
  <SettingContainer
    :navigation="props.navigation"
    :title="i18n.t('module.setting.notifications.title')"
  >
    <div class="p-xl flex-1 flex flex-col gap-4xl">
      <SettingNotificationsQuickActions
        :selected-action="selectedAction"
        @select="onQuickActionSelect"
      />
      <AppSeparator
        variant="quaternary"
        direction="horizontal"
      />
      <SettingNotificationsTable
        :preference="preference"
        :defaults="defaults"
        @update="onUpdate"
        @update-global="onGlobalUpdate"
      />
    </div>
  </settingcontainer>
</template>
