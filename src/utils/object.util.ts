export function deepClone<T>(data: T): T {
	return JSON.parse(JSON.stringify(data)) as T
}

export function isNotEmpty<T>(value: T | null | undefined): value is T {
	return value !== null && value !== undefined
}
