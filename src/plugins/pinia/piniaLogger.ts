/* eslint-disable no-console */
import type { PiniaPluginContext } from 'pinia'

const { VITE_ENVIRONMENT } = import.meta.env

export function piniaLogger() {
	return (ctx: PiniaPluginContext): void => {
		ctx.store.$onAction((action) => {
			if (VITE_ENVIRONMENT !== 'development') {
				return
			}

			const { args, name, store } = action

			const now = new Date()
			const timestamp = now.toLocaleTimeString('nl-BE')

			console.groupCollapsed(
				`%c[%c${store.$id}Store.%c${name}] - %c${timestamp}`,
				'font-weight: bold;',
				'color: #3f3f3f;',
				'color: #8d41c9;',
				'font-weight: normal;'
			)
			console.log(args[0])
			console.groupEnd()
		})
	}
}
