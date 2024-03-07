import { describe, expect, it } from 'vitest'

import { useTheme } from '@/composables/theme/theme.composable'
import { themeConstantSchema } from '@/constants/theme.constant.ts'

describe('useTheme', () => {
	it('theme default be null', () => {
		const { theme } = useTheme()

		expect(theme.value).toBe(null)
	})

	it('theme be set when setting the theme', () => {
		const { theme, setTheme } = useTheme()

		setTheme(themeConstantSchema.Values['custom-theme'])

		expect(theme.value).toBe(themeConstantSchema.Values['custom-theme'])
	})
})
