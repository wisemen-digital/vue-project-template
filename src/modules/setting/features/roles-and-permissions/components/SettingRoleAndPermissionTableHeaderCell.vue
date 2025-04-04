<script setup lang="ts">
import type { DropdownMenuItem } from '@wisemen/vue-core'
import {
  VcDropdownMenu,
  VcIcon,
} from '@wisemen/vue-core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import type { SettingRole } from '@/modules/setting/models/role/settingRole.model.ts'
import type { SettingRoleUuid } from '@/modules/setting/models/role/settingRoleUuid.model.ts'

const props = defineProps<{
  role: SettingRole
}>()

const emit = defineEmits<{
  deleteRole: [SettingRoleUuid]
}>()

const i18n = useI18n()

const dropDownItems = computed<DropdownMenuItem[]>(() => ([
  {
    isDestructive: true,
    icon: 'trash',
    label: i18n.t('module.settings.roles_and_permissions.table.delete_role'),
    type: 'option',
    onSelect: (): void => {
      emit('deleteRole', props.role.uuid)
    },
  },
]))
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
      :items="dropDownItems"
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
    </VcDropdownMenu>
  </div>
</template>
