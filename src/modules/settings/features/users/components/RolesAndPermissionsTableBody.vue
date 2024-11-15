<script setup lang="ts">
import { AppCheckbox, AppIcon } from '@wisemen/vue-core'
import { ref } from 'vue'

import AppHeightTransition from '@/components/app/AppHeightTransition.vue'
import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import type { Permission } from '@/models/permission/permission.model.ts'
import type { PermissionId } from '@/models/permission/permissionId.model.ts'
import type { Role } from '@/models/role/role.model.ts'
import type { RoleUuid } from '@/models/role/roleUuid.model.ts'

const props = defineProps<{
  isTableScrolledToBottom: boolean
  permissions: Permission[]
  roles: Role[]
  rolesModelMap: Map<string, null | string[]>
}>()

const emit = defineEmits<{
  togglePermissionTab: [string]
  updateActionCheckbox: [value: boolean, permissionId: string, roleUuid: RoleUuid, action: string]
  updatePermissionCheckbox: [value: boolean, permissionId: string, roleUuid: RoleUuid]
}>()

const permissionsToggleStateMap = ref<Map<string, boolean>>(new Map(
  props.permissions.map((permission) => [
    permission.id,
    false,
  ]),
))

function onTogglePermissionActionsClick(permissionId: string): void {
  permissionsToggleStateMap.value.set(permissionId, !permissionsToggleStateMap.value.get(permissionId)!)
}

function isPermissionTabOpen(permissionId: string): boolean {
  return permissionsToggleStateMap.value.get(permissionId)!
}

function isPermissionCheckboxChecked(permissionId: PermissionId, roleUuid: RoleUuid): boolean {
  const key = `${permissionId}-${roleUuid}`
  const value = props.rolesModelMap.get(key) ?? null

  const permissionActions = props.permissions.find((permission) => permission.id === permissionId)?.actions ?? null

  if (value === null) {
    return false
  }

  if (permissionActions === null) {
    return true
  }

  return value.length > 0
}

function isActionCheckboxChecked(permissionId: PermissionId, roleUuid: RoleUuid, action: string): boolean {
  const key = `${permissionId}-${roleUuid}`
  const value = props.rolesModelMap.get(key) ?? null

  if (value === null) {
    return false
  }

  return value.includes(action)
}

function isPermissionCheckboxIndeterminate(permissionId: PermissionId, roleUuid: RoleUuid): boolean {
  const key = `${permissionId}-${roleUuid}`
  const value = props.rolesModelMap.get(key)

  if (!value) {
    return false
  }

  const permissionActions = props.permissions.find((permission) => permission.id === permissionId)?.actions ?? null

  if (permissionActions === null) {
    return false
  }

  return value.length !== permissionActions.length && value.length !== 0
}

function onUpdatePermissionCheckbox(value: boolean, permissionId: PermissionId, roleUuid: RoleUuid): void {
  emit('updatePermissionCheckbox', value, permissionId, roleUuid)
}

function onUpdateActionCheckbox(value: boolean, permissionId: PermissionId, roleUuid: RoleUuid, action: string): void {
  emit('updateActionCheckbox', value, permissionId, roleUuid, action)
}
</script>

<template>
  <div
    v-for="permission of props.permissions"
    :key="permission.id"
    :class="{
      'last:border-b-transparent': props.isTableScrolledToBottom,
    }"
    class="col-span-full grid grid-cols-subgrid border-b border-solid border-secondary"
  >
    <div
      class="z-30 col-span-full grid grid-cols-subgrid"
    >
      <Component
        :is="permission.actions ? AppUnstyledButton : 'div'"
        class="sticky left-0 flex items-center justify-between border-r border-solid border-secondary bg-primary p-3 px-6 text-left !ring-offset-0"
        @click="onTogglePermissionActionsClick(permission.id)"
      >
        {{ permission.id }}
        <AppIcon
          v-if="permission.actions"
          :icon="isPermissionTabOpen(permission.id) ? 'chevronUp' : 'chevronDown'"
        />
      </Component>
      <div
        v-for="(role) of props.roles"
        :key="role.uuid"
        class="flex items-center justify-center border-r border-solid p-3 last:border-none"
      >
        <AppCheckbox
          :model-value="isPermissionCheckboxChecked(permission.id, role.uuid)"
          :is-indeterminate="isPermissionCheckboxIndeterminate(permission.id, role.uuid)"
          @update:model-value="(event) => onUpdatePermissionCheckbox(event, permission.id, role.uuid)"
        />
      </div>
    </div>

    <AppHeightTransition
      :duration="0.3"
    >
      <div
        v-if="isPermissionTabOpen(permission.id)"
        class="col-span-full grid grid-cols-subgrid items-start"
      >
        <div
          v-for="(action, index) in permission.actions"
          :key="action"
          class="col-span-full grid grid-cols-subgrid border-b first:border-t last:border-b-0"
        >
          <div
            class="sticky left-0 flex gap-2 border-r bg-secondary p-3 pl-10 text-secondary"
          >
            <AppIcon
              :class="{
                'opacity-100': index === 0,
              }"
              size="xs"
              icon="leftBottomCorner"
              class="mt-0.5 text-quaternary opacity-0"
            />
            <span>
              {{ action }}
            </span>
          </div>
          <div
            v-for="role of props.roles"
            :key="role.uuid"
            class="flex justify-center border-r border-solid p-3 last:border-none"
          >
            <AppCheckbox
              :model-value="isActionCheckboxChecked(permission.id, role.uuid, action)"
              @update:model-value="
                (event) => onUpdateActionCheckbox(event, permission.id, role.uuid, action)
              "
            />
          </div>
        </div>
      </div>
    </AppHeightTransition>
  </div>
</template>
