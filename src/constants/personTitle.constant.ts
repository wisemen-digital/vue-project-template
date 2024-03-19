import { computed } from 'vue'
import { z } from 'zod'

import { i18nPlugin } from '@/plugins/i18n/i18n.plugin.ts'
import type { DataItem } from '@/types/dataItem.type'

export const personTitleConstantSchema = z.enum([
  'mr',
  'mrs',
  'miss',
  'ms',
  'dr',
  'prof',
  'other',
])

export type PersonTitleConstant = z.infer<typeof personTitleConstantSchema>

export const PERSON_TITLE_ITEMS = computed<DataItem<PersonTitleConstant>[]>(() => {
  const { t } = i18nPlugin.global

  return [
    {
      label: t('shared.mr'),
      value: 'mr',
    },
    {
      label: t('shared.mrs'),
      value: 'mrs',
    },
    {
      label: t('shared.miss'),
      value: 'miss',
    },
    {
      label: t('shared.ms'),
      value: 'ms',
    },
    {
      label: t('shared.dr'),
      value: 'dr',
    },
    {
      label: t('shared.prof'),
      value: 'prof',
    },
    {
      label: t('shared.other'),
      value: 'other',
    },
  ]
})
