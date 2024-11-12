<script setup lang="ts">
import { AppIcon } from '@wisemen/vue-core'

import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import { useI18n } from '@/composables/i18n/i18n.composable.ts'
import { RoleNameEnum } from '@/models/role/role.enum.ts'
import type { Role } from '@/models/role/role.model.ts'

const props = defineProps<{
  roles: Role[]
}>()

const i18n = useI18n()
</script>

<template>
  <div
    class="sticky top-0 z-40 col-span-full grid grid-cols-subgrid border-b border-solid border-secondary bg-secondary"
  >
    <div
      class="sticky left-0 z-10 flex items-center gap-2 border-r border-solid border-secondary bg-secondary p-3 px-6 text-sm text-secondary"
    >
      <span>
        {{ i18n.t('module.settings.roles_and_permissions.table.permissions') }}
      </span>
      <AppIcon
        icon="cornerRightDown"
      />
    </div>
    <div
      v-for="role of props.roles"
      :key="role.uuid"
      class="border-r border-solid border-secondary last:border-none"
    >
      <div class="flex items-center justify-center gap-4 text-nowrap p-3 px-6 text-sm text-secondary">
        <span>
          {{ i18n.t(RoleNameEnum.getI18nKey(role.name)) }}
        </span>
        <AppUnstyledButton>
          <AppIcon
            icon="threeDots"
          />
        </AppUnstyledButton>
      </div>
    </div>
  </div>
</template>
