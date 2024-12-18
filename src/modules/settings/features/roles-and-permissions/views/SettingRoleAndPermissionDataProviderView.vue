<script  lang="ts" setup="">
import AppDataProviderView from '@/components/app/AppDataProviderView.vue'
import { useSettingPermissionQuery } from '@/modules/settings/api/queries/settingPermission.query'
import { useSettingRolesQuery } from '@/modules/settings/api/queries/settingRole.query'
import SettingRoleAndPermissionView from '@/modules/settings/features/roles-and-permissions/views/SettingRoleAndPermissionView.vue'

const settingPermissionQuery = useSettingPermissionQuery()
const settingRoleQuery = useSettingRolesQuery()
</script>

<template>
  <AppDataProviderView
    :queries="{
      permissions: settingPermissionQuery,
      roles: settingRoleQuery,
    }"
  >
    <template #default="{ data }">
      <SettingRoleAndPermissionView
        :permissions="data.permissions"
        :roles="data.roles"
      />
    </template>
  </AppDataProviderView>
</template>
