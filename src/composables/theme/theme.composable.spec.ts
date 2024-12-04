import {
  describe,
  expect,
  it,
} from 'vitest'

import { useTheme } from '@/composables/theme/theme.composable'
import { themeConstantSchema } from '@/constants/theme.constant.ts'

describe('useTheme', () => {
  it('theme default be null', () => {
    const theme = useTheme()

    expect(theme.current.value).toBeNull()
  })

  it('theme be set when setting the theme', () => {
    const theme = useTheme()

    theme.set(themeConstantSchema.Values.dark)

    expect(theme.current.value).toBe(themeConstantSchema.Values.dark)
  })
})
