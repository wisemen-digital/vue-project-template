export enum EnvironmentMode {
	DEVELOPMENT = 'development',
	QA = 'qa',
	SANDBOX = 'sandbox',
	PRODUCTION = 'production',
	STAGING = 'staging',
}

export interface Environment {
	version: string
	isDevelopment: boolean
	currentEnvironment: EnvironmentMode
	isAllowed: (environmentMode: EnvironmentMode[]) => boolean
}

export const IS_DEVELOPMENT = import.meta.env.MODE === EnvironmentMode.DEVELOPMENT
export const CURRENT_ENVIRONMENT = import.meta.env.MODE as EnvironmentMode
export const VERSION = import.meta.env.VITE_APP_VERSION as string

export function isAllowed(environmentMode: EnvironmentMode[]): boolean {
	return environmentMode.includes(import.meta.env.MODE as EnvironmentMode)
}
