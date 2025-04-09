<script setup lang="ts">
import {
  VcDropdownMenu,
  VcDropdownMenuItem,
  VcIcon,
} from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import type { SettingsRole } from '@/modules/settings/models/role/settingsRole.model.ts'
import type { SettingsRoleUuid } from '@/modules/settings/models/role/settingsRoleUuid.model.ts'

const props = defineProps<{
  role: SettingsRole
}>()

const emit = defineEmits<{
  deleteRole: [SettingsRoleUuid]
}>()

const i18n = useI18n()
</script>

<template>
  <div
    class="
      text-secondary flex items-center justify-center gap-4 p-3 px-6 text-sm
      text-nowrap
    "
  >
    <span>
      {{ props.role.name }}
    </span>
    <VcDropdownMenu
      :is-arrow-hidden="true"
      side="top"
    >
      <template #trigger>
        <AppUnstyledButton>
          <VcIcon
            icon="threeDots"
            class="size-4"
          />
        </AppUnstyledButton>
      </template>
      <template #content>
        <VcDropdownMenuItem
          :is-destructive="true"
          :label="i18n.t('module.settings.roles_and_permissions.table.delete_role')"
          icon="trashIcon"
          @select="() => emit('deleteRole', props.role.uuid)"
        />
      </template>
    </VcDropdownMenu>
  </div>
</template>
