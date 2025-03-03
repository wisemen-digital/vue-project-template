<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import type { Form } from 'formango'
import { computed, ref } from 'vue'

import type { SettingPermission } from '@/models/permission/permission.model.ts'
import SettingRoleAndPermissionTableBody from '@/modules/settings/features/roles-and-permissions/components/SettingRoleAndPermissionTableBody.vue'
import SettingRoleAndPermissionTableHeader from '@/modules/settings/features/roles-and-permissions/components/SettingRoleAndPermissionTableHeader.vue'
import type { SettingRole } from '@/modules/settings/models/setting-role/settingRole.model.ts'
import type {
  settingRolePermissionUpdateFormSchema,
} from '@/modules/settings/models/setting-role/settingRolePermissionUpdateForm.model.ts'
import type { SettingRoleUuid } from '@/modules/settings/models/setting-role/settingRoleUuid.model.ts'

const props = defineProps<{
  form: Form<typeof settingRolePermissionUpdateFormSchema>
  permissions: SettingPermission[]
  roles: SettingRole[]
}>()

const emit = defineEmits<{
  deleteRole: [SettingRoleUuid]
}>()

const tableScrollContainerRef = ref<HTMLElement | null>(null)

const scroll = useScroll(tableScrollContainerRef)

const isTableScrollable = computed<boolean>(() => !scroll.arrivedState.bottom || !scroll.arrivedState.top)

const isTableScrolledToBottom = computed<boolean>(() => {
  if (!isTableScrollable.value) {
    return false
  }

  return scroll.arrivedState.bottom
})

const gridColsStyle = computed<string>(() => {
  const firstColumn = 'minmax(200px, 300px)'

  return `${firstColumn} ${props.roles.map(() => `minmax(200px, auto)`).join(' ')}`
})

function onDeleteRole(roleUuid: SettingRoleUuid): void {
  emit('deleteRole', roleUuid)
}
</script>

<template>
  <div class="flex flex-1 flex-col overflow-hidden rounded-xl border border-solid border-secondary bg-primary">
    <div
      ref="tableScrollContainerRef"
      :style="{
        gridTemplateColumns: gridColsStyle,
      }"
      class="grid overflow-auto"
    >
      <SettingRoleAndPermissionTableHeader
        :roles="props.roles"
        @delete-role="onDeleteRole"
      />

      <SettingRoleAndPermissionTableBody
        :roles="props.roles"
        :form="props.form"
        :is-table-scrollable="isTableScrollable"
        :is-table-scrolled-to-bottom="isTableScrolledToBottom"
        :permissions="props.permissions"
      />
    </div>
  </div>
</template>
