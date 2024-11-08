<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { computed, ref } from 'vue'

import type { Permission } from '@/models/permission/permission.model.ts'
import type { Role } from '@/models/role/role.model.ts'
import RolesAndPermissionsTableBody
  from '@/modules/settings/features/roles-and-permissions/components/RolesAndPermissionsTableBody.vue'
import RolesAndPermissionsTableHeader
  from '@/modules/settings/features/roles-and-permissions/components/RolesAndPermissionsTableHeader.vue'
import { ObjectUtil } from '@/utils/object.util.ts'

const props = defineProps<{
  permissions: Permission[]
  roles: Role[]
}>()

const rolesModelMap = defineModel<Map<string, null | string[]>>({ required: true })
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

function onUpdatePermissionCheckbox(value: boolean, permissionId: string, index: number): void {
  const key = `${permissionId}-${index}`

  const permissionActions = props.permissions.find((permission) => permission.id === permissionId)?.actions ?? null

  if (permissionActions === null) {
    return
  }

  rolesModelMap.value.set(key, value ? permissionActions : null)
}

function onUpdateActionCheckbox(value: boolean, permissionId: string, index: number, action: string): void {
  const key = `${permissionId}-${index}`

  const valueArray = ObjectUtil.deepClone<null | string[] | undefined>(rolesModelMap.value.get(key)) ?? []

  if (value) {
    valueArray.push(action)
  }
  else {
    const actionIndex = valueArray.indexOf(action)

    if (actionIndex !== -1) {
      valueArray.splice(actionIndex, 1)
    }
  }

  rolesModelMap.value.set(key, valueArray.length > 0 ? valueArray : null)
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
      <RolesAndPermissionsTableHeader :roles="props.roles" />

      <RolesAndPermissionsTableBody
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
