import { defineConfig } from 'cva'

import { twMerge } from './twMerge.lib'

export type { VariantProps } from 'cva'
export const { cva, cx, compose } = defineConfig({
	hooks: {
		onComplete: (className) => twMerge(className),
	},
})
