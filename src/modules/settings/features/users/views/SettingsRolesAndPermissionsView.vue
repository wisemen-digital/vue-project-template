<script  lang="ts" setup="">
import { AppButton } from '@wisemen/vue-core'
import { ref } from 'vue'

import AppTeleport from '@/components/app/teleport/AppTeleport.vue'
import { useI18n } from '@/composables/i18n/i18n.composable.ts'
import type { Permission } from '@/models/permission/permission.model.ts'
import type { Role } from '@/models/role/role.model.ts'
import RolesAndPermissionsTable
  from '@/modules/settings/features/users/components/RolesAndPermissionsTable.vue'
import { RolesAndPermissionsTableUtil } from '@/utils/rolesAndPermissionsTable.util.ts'

const props = defineProps<{
  permissions: Permission[]
  roles: Role[]
}>()

const i18n = useI18n()
const rolesModelMap = ref<Map<string, null | string[]>>(
  new Map(
    RolesAndPermissionsTableUtil.createGrid(
      props.permissions,
      props.roles,
    ),
  ),
)
</script>

<template>
  <div class="flex flex-1 flex-col overflow-hidden py-5">
    <AppTeleport to="headerActions">
      <AppButton>
        {{ i18n.t('shared.add_item', { item: i18n.t('shared.role') }) }}
      </AppButton>
    </AppTeleport>
    <RolesAndPermissionsTable
      v-model="rolesModelMap"
      :permissions="props.permissions"
      :roles="props.roles"
    />
  </div>
</template>
