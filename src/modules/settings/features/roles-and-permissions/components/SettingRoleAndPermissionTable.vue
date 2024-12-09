<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { computed, ref } from 'vue'

import type { Permission } from '@/models/permission/permission.model.ts'
import type { PermissionAction } from '@/models/permission/permissionAction.model.ts'
import type { PermissionId } from '@/models/permission/permissionId.model.ts'
import type { Role } from '@/models/role/role.model.ts'
import type { RoleUuid } from '@/models/role/roleUuid.model.ts'
import SettingRoleAndPermissionTableBody from '@/modules/settings/features/roles-and-permissions/components/SettingRoleAndPermissionTableBody.vue'
import SettingRoleAndPermissionTableHeader from '@/modules/settings/features/roles-and-permissions/components/SettingRoleAndPermissionTableHeader.vue'
import type {
  RoleAndPermissionTableMapId,
  RoleAndPermissionTableMapValue,
} from '@/modules/settings/utils/roleAndPermissionTable.util.ts'
import { ObjectUtil } from '@/utils/object.util'

const props = defineProps<{
  permissions: Permission[]
  roles: Role[]
}>()

const emit = defineEmits<{
  deleteRole: [RoleUuid]
}>()

const rolesModelMap = defineModel<Map<RoleAndPermissionTableMapId, RoleAndPermissionTableMapValue>>({ required: true })
const tableScrollContainerRef = ref<HTMLElement | null>(null)

const scroll = useScroll(tableScrollContainerRef)

const isTableScrolledToBottom = computed<boolean>(() => {
  const canScroll = !scroll.arrivedState.bottom || !scroll.arrivedState.top

  if (!canScroll) {
    return false
  }

  return scroll.arrivedState.bottom
})

const gridColsStyle = computed<string>(() => {
  const firstColumn = 'minmax(200px, 300px)'

  return `${firstColumn} ${props.roles.map(() => `minmax(200px, auto)`).join(' ')}`
})

function onUpdatePermissionCheckbox(value: boolean, permissionId: PermissionId, roleUuid: RoleUuid): void {
  const key = `${permissionId}-${roleUuid}`

  const permissionActions = props.permissions.find((permission) => permission.id === permissionId)?.actions ?? null

  if (value) {
    if (permissionActions !== null) {
      rolesModelMap.value.set(key, permissionActions)

      return
    }

    rolesModelMap.value.set(key, [])

    return
  }

  if (permissionActions !== null) {
    rolesModelMap.value.set(key, [])

    return
  }

  rolesModelMap.value.set(key, null)
}

function onDeleteRole(roleUuid: RoleUuid): void {
  emit('deleteRole', roleUuid)
}

function onUpdateActionCheckbox(
  value: boolean,
  permissionId: PermissionId,
  roleUuid: RoleUuid,
  action: PermissionAction,
): void {
  const key = `${permissionId}-${roleUuid}`

  const valueArray = ObjectUtil.deepClone<string[] | null | undefined>(rolesModelMap.value.get(key)) ?? []

  if (!value) {
    const actionIndex = valueArray.indexOf(action)

    if (actionIndex !== -1) {
      valueArray.splice(actionIndex, 1)
    }
  }

  if (value) {
    valueArray.push(action)
  }

  rolesModelMap.value.set(key, valueArray.length > 0 ? valueArray : [])
}
</script>

<template>
  <div
    class="flex flex-1 flex-col overflow-hidden rounded-xl border border-solid border-secondary bg-primary"
  >
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
        :roles-model-map="rolesModelMap"
        :is-table-scrolled-to-bottom="isTableScrolledToBottom"
        :permissions="props.permissions"
        @update-permission-checkbox="onUpdatePermissionCheckbox"
        @update-action-checkbox="onUpdateActionCheckbox"
      />
    </div>
  </div>
</template>
