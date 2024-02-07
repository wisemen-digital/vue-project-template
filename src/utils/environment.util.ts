import type { ComputedRef } from 'vue'
import { computed } from 'vue'

export enum EnvironmentMode {
	DEVELOPMENT = 'development',
	QA = 'qa',
	SANDBOX = 'sandbox',
	PRODUCTION = 'production',
	STAGING = 'staging',
}

// TODO

interface Environment {
	isDevelopment: ComputedRef<boolean>
	isAllowed: (environmentMode: EnvironmentMode[]) => boolean
	version: ComputedRef<string>
	currentEnvironment: ComputedRef<EnvironmentMode>
}

export function useEnvironment(): Environment {
	const isDevelopment = computed<boolean>(() => {
		return import.meta.env.MODE === EnvironmentMode.DEVELOPMENT
	})

	const currentEnvironment = computed<EnvironmentMode>(() => {
		return import.meta.env.MODE as EnvironmentMode
	})

	const version = computed<string>(() => {
		return import.meta.env.VITE_APP_VERSION as string
	})

	function isAllowed(environmentMode: EnvironmentMode[]): boolean {
		return environmentMode.includes(import.meta.env.MODE as EnvironmentMode)
	}

	return {
		currentEnvironment,
		isAllowed,
		isDevelopment,
		version,
	}
}
