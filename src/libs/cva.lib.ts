import { defineConfig } from 'cva'

import { twMerge } from './twMerge.lib'

export const { cva, cx, compose } = defineConfig({
	hooks: {
		onComplete: (className) => twMerge(className),
	},
})
