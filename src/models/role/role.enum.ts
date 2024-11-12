import { z } from 'zod'

import type { I18nKey } from '@/plugins/i18n/i18n.plugin.ts'
import type { I18nKeyMap } from '@/types/enum.types.ts'

export enum RoleName {
  ADMIN = 'ADMIN',
  TEST = 'TEST',
  USER = 'USER',
}

export const roleNameSchema = z.nativeEnum(RoleName)

export class RoleNameEnum {
  private static i18nKeys: I18nKeyMap<RoleName> = {
    [RoleName.ADMIN]: 'shared.admin',
    [RoleName.TEST]: 'shared.user',
    [RoleName.USER]: 'shared.user',
  }

  static getI18nKey(role: RoleName): I18nKey {
    return this.i18nKeys[role]
  }
}
