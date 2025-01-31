import { z } from 'zod'

import type { I18nKey } from '@/plugins/i18n/i18n.plugin.ts'
import { createI18nKeyMap } from '@/types/enum.type'

export enum RoleName {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const roleNameSchema = z.nativeEnum(RoleName)

export class RoleNameEnum {
  private static i18nKeys = createI18nKeyMap<RoleName>({
    [RoleName.ADMIN]: 'enum.role.admin',
    [RoleName.USER]: 'enum.role.user',
  })

  static getI18nKey(role: RoleName): I18nKey | null {
    return this.i18nKeys.get(role) ?? null
  }
}
