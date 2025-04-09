import type { FontSize } from '@/client'
import type { I18nKey } from '@/plugins/i18n.plugin.ts'
import { createI18nKeyMap } from '@/types/enum.type.ts'

export class FontSizeEnumUtil {
  private static i18nKeys = createI18nKeyMap<FontSize>({
    default: 'module.settings.font_size.default',
    large: 'module.settings.font_size.large',
    larger: 'module.settings.font_size.larger',
    small: 'module.settings.font_size.small',
    smaller: 'module.settings.font_size.smaller',
  })

  static getI18nKey(value: FontSize): I18nKey {
    return this.i18nKeys.get(value)!
  }
}
