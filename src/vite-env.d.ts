/// <reference types="vite/client" />

// eslint-disable-next-line check-file/filename-naming-convention
interface ImportMetaEnv {
	readonly API_BASE_URL: string
	readonly API_ENDPOINT: string
	readonly API_CLIENT_ID: string
	readonly API_CLIENT_SECRET: string
	readonly SENTRY_DSN: string
	readonly SENTRY_TRACING_ORIGIN: string
	readonly ENVIRONMENT: 'development' | 'production' | 'staging' | 'test'
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

declare const BUILD_COMMIT: string
declare const BUILD_NUMBER: string
declare const BUILD_TIMESTAMP: string
