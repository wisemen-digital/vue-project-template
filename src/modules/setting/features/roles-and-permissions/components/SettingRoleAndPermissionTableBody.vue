<script setup lang="ts">
import {
  VcCheckbox,
  VcIcon,
} from '@wisemen/vue-core'
import type { Form } from 'formango'
import { ref } from 'vue'

import type { Permission } from '@/client'
import AppUnstyledButton from '@/components/app/button/AppUnstyledButton.vue'
import AppHeightTransition from '@/components/app/transition/AppHeightTransition.vue'
import type { SettingPermission } from '@/modules/setting/models/permission/settingPermission.model.ts'
import type { SettingRole } from '@/modules/setting/models/role/settingRole.model.ts'
import type { settingRolePermissionUpdateFormSchema } from '@/modules/setting/models/role/settingRolePermissionUpdateForm.model.ts'
import type { SettingRoleUuid } from '@/modules/setting/models/role/settingRoleUuid.model.ts'
import { assert } from '@/utils/assert.util.ts'

const props = defineProps<{
  isTableScrollable: boolean
  isTableScrolledToBottom: boolean
  form: Form<typeof settingRolePermissionUpdateFormSchema>
  permissions: SettingPermission[]
  roles: SettingRole[]
}>()

const openPermissionTabs = ref<string[]>([])

const rolesForm = props.form.registerArray('roles')

function onTogglePermissionActionsClick(key: string): void {
  if (getActionsForKey(key).length === 1) {
    return
  }

  if (isPermissionTabOpen(key)) {
    openPermissionTabs.value = openPermissionTabs.value.filter((tab) => tab !== key)
  }
  else {
    openPermissionTabs.value.push(key)
  }
}

function isPermissionTabOpen(key: string): boolean {
  return openPermissionTabs.value.includes(key)
}

function getActionsForKey(key: string): Permission[] {
  return props.permissions.find((permission) => permission.key === key)?.actions ?? []
}

function getActiveActionsForKeyAndRole(key: string, roleUuid: SettingRoleUuid): Permission[] {
  const value = rolesForm.modelValue.value.find((value) => value.roleUuid === roleUuid)?.permissions ?? []

  return value.find((v) => v.key === key)?.actions ?? []
}

function isPermissionCheckboxChecked(key: string, roleUuid: SettingRoleUuid): boolean {
  const permissionsForRole = rolesForm.modelValue.value.find((role) => role.roleUuid === roleUuid)?.permissions ?? []

  return (permissionsForRole.find((p) => p.key === key)?.actions.length ?? 0) > 0
}

function isActionCheckboxChecked(
  key: string,
  roleUuid: SettingRoleUuid,
  action: Permission,
): boolean {
  const activeActions = getActiveActionsForKeyAndRole(key, roleUuid)

  return activeActions.includes(action)
}

function isPermissionCheckboxIndeterminate(key: string, roleUuid: SettingRoleUuid): boolean {
  const allActions = getActionsForKey(key)
  const activeActions = getActiveActionsForKeyAndRole(key, roleUuid)

  return activeActions.length > 0 && activeActions.length < allActions.length
}

function onUpdatePermissionCheckbox(value: boolean, key: string, roleUuid: SettingRoleUuid): void {
  const roleIndex = rolesForm.modelValue.value.findIndex((role) => role.roleUuid === roleUuid)

  const permissionsForRole = rolesForm.register(`${roleIndex}`)

  const permissionsForRoleValue = permissionsForRole.modelValue.value

  assert(permissionsForRoleValue !== null, `Role ${roleUuid} not found`)

  const filteredPermissions = permissionsForRoleValue.permissions.filter((permission) => permission.key !== key)

  permissionsForRole.setValue({
    roleUuid,
    isEditable: permissionsForRoleValue.isEditable,
    permissions: value
      ? [
          ...filteredPermissions,
          {
            actions: getActionsForKey(key),
            key,
          },
        ]
      : filteredPermissions,
  })
}

function isPermissionCheckboxDisabled(roleUuid: SettingRoleUuid): boolean {
  return !(rolesForm.modelValue.value.find((role) => role.roleUuid === roleUuid)?.isEditable ?? false)
}

function onUpdateActionCheckbox(
  value: boolean,
  key: string,
  roleUuid: SettingRoleUuid,
  action: Permission,
): void {
  const roleIndex = rolesForm.modelValue.value.findIndex((role) => role.roleUuid === roleUuid)

  const permissionsForRole = rolesForm.register(`${roleIndex}`)

  const permissionForRoleValue = permissionsForRole.modelValue.value

  assert(permissionForRoleValue !== null, `Role ${roleUuid} not found`)

  permissionsForRole.setValue({
    roleUuid,
    isEditable: permissionForRoleValue.isEditable,
    permissions: permissionForRoleValue.permissions.map((permission) => {
      if (permission.key !== key) {
        return permission
      }

      const actions = permission.actions.filter((a) => a !== action)

      return {
        ...permission,
        actions: value
          ? [
              ...actions,
              action,
            ]
          : actions,
      }
    }) ?? [],
  })
}
</script>

<template>
  <div
    v-for="permission of props.permissions"
    :key="permission.key"
    :class="{
      'last:border-b-0': props.isTableScrolledToBottom || !props.isTableScrollable,
    }"
    class="
      border-secondary col-span-full grid grid-cols-subgrid border-b
      border-solid
    "
  >
    <div class="z-2 col-span-full grid grid-cols-subgrid">
      <Component
        :is="permission.actions.length > 1 ? AppUnstyledButton : 'div'"
        class="
          border-secondary bg-primary sticky left-0 flex items-center
          justify-between border-r border-solid p-3 px-6 text-left text-sm
          uppercase !ring-offset-0
        "
        @click="onTogglePermissionActionsClick(permission.key)"
      >
        <span class="text-primary text-sm font-medium">
          {{ permission.key }}
        </span>

        <VcIcon
          v-if="permission.actions.length > 1"
          :icon="isPermissionTabOpen(permission.key) ? 'chevronUp' : 'chevronDown'"
          class="text-secondary size-4"
        />
      </Component>

      <div
        v-for="(role) of props.roles"
        :key="role.uuid"
        class="
          border-secondary flex items-center justify-center border-r
          border-solid p-3
          last:border-none
        "
      >
        <VcCheckbox
          :model-value="isPermissionCheckboxChecked(permission.key, role.uuid)"
          :is-disabled="isPermissionCheckboxDisabled(role.uuid)"
          :is-indeterminate="isPermissionCheckboxIndeterminate(permission.key, role.uuid)"
          @update:model-value="(event) => onUpdatePermissionCheckbox(event, permission.key, role.uuid)"
        />
      </div>
    </div>

    <AppHeightTransition :duration="0.3">
      <div
        v-if="isPermissionTabOpen(permission.key)"
        class="col-span-full grid grid-cols-subgrid items-start"
      >
        <div
          v-for="(action, actionIndex) in permission.actions"
          :key="action"
          class="
            border-secondary col-span-full grid grid-cols-subgrid border-b
            first:border-t
            last:border-b-0
          "
        >
          <div
            class="
              border-secondary bg-secondary text-secondary sticky left-0 flex
              gap-2 border-r p-3 pl-10
            "
          >
            <VcIcon
              :class="{
                'opacity-100': actionIndex === 0,
              }"
              icon="bottomLeftCorner"
              class="text-quaternary mt-0.5 size-3 opacity-0"
            />
            <span class="text-secondary text-sm">
              {{ action.split('.')[1] }}
            </span>
          </div>

          <div
            v-for="role of props.roles"
            :key="role.uuid"
            class="
              bg-secondary border-secondary flex justify-center border-r
              border-solid p-3 text-sm
              last:border-none
            "
          >
            <VcCheckbox
              :is-disabled="isPermissionCheckboxDisabled(role.uuid)"
              :model-value="isActionCheckboxChecked(permission.key, role.uuid, action)"
              @update:model-value="(event) => onUpdateActionCheckbox(event, permission.key, role.uuid, action)"
            />
          </div>
        </div>
      </div>
    </AppHeightTransition>
  </div>
</template>
