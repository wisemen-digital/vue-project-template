<script  lang="ts" setup="">
import AppDataProviderView from '@/components/app/AppDataProviderView.vue'
import { useSettingsPermissionsQuery } from '@/modules/settings/api/queries/settingsPermissions.query.ts'
import { useSettingsRolesQuery } from '@/modules/settings/api/queries/settingsRoles.query.ts'
import SettingsRolesAndPermissionsView
  from '@/modules/settings/features/users/views/SettingsRolesAndPermissionsView.vue'

const settingsPermissionsQuery = useSettingsPermissionsQuery()
const settingsRolesQuery = useSettingsRolesQuery()
</script>

<template>
  <AppDataProviderView
    :queries="{
      permissions: settingsPermissionsQuery,
      roles: settingsRolesQuery,
    }"
  >
    <template #default="{ data }">
      <SettingsRolesAndPermissionsView
        :permissions="data.permissions"
        :roles="data.roles"
      />
    </template>
  </AppDataProviderView>
</template>
