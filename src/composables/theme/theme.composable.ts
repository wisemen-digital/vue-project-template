import { useLocalStorage } from '@vueuse/core'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'

import type { ThemeConstant } from '@/constants/theme.constant.ts'

export interface UseThemeReturnType {
	theme: ComputedRef<ThemeConstant | null>
	setTheme: (value: ThemeConstant | null) => void
}

export function useTheme(): UseThemeReturnType {
	const theme = useLocalStorage<ThemeConstant | null>('theme', null)

	function setTheme(value: ThemeConstant | null): void {
		theme.value = value
	}

	return {
		theme: computed<ThemeConstant | null>(() => theme.value),
		setTheme,
	}
}
