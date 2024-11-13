<script setup lang="ts">
import type { DropdownMenuItem } from '@wisemen/vue-core'
import {
  AppDropdownMenu,
  AppIcon,
} from '@wisemen/vue-core'
import { computed } from 'vue'

import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import { useI18n } from '@/composables/i18n/i18n.composable.ts'
import type { Role } from '@/models/role/role.model.ts'
import type { RoleUuid } from '@/models/role/roleUuid.model.ts'

const props = defineProps<{
  role: Role
}>()

const emit = defineEmits<{
  deleteRole: [RoleUuid]
}>()

const i18n = useI18n()

const dropDownItems = computed<DropdownMenuItem[]>(() => ([
  {
    isDestructive: true,
    icon: 'settings',
    label: i18n.t('module.settings.roles_and_permissions.table.delete_role'),
    type: 'option',
    onSelect: (): void => {
      emit('deleteRole', props.role.uuid)
    },
  },
]))
</script>

<template>
  <div class="flex items-center justify-center gap-4 text-nowrap p-3 px-6 text-sm text-secondary">
    <span>
      {{ props.role.name }}
    </span>
    <AppDropdownMenu
      :items="dropDownItems"
      :is-arrow-hidden="true"
      side="top"
    >
      <template #trigger>
        <AppUnstyledButton>
          <AppIcon
            icon="threeDots"
          />
        </AppUnstyledButton>
      </template>
    </AppDropdownMenu>
  </div>
</template>
