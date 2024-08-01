import { z } from 'zod'

import { i18nPlugin } from '@/plugins/i18n/i18n.plugin.ts'

const { t } = i18nPlugin.global

export const resetPasswordFormSchema = z.object({
  password: z.string().min(6).regex(
    /(?=.*\W)/,
    { message: t('error.must_contain_a_special_character') },
  ),
  secret: z.string(),
  token: z.string(),
})

export type ResetPasswordForm = z.infer<typeof resetPasswordFormSchema>
