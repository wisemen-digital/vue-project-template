/* eslint-disable no-console */
export function logError(...data: unknown[]): void {
	console.error(data)
}

export function logInfo(...data: unknown[]): void {
	console.log(data)
}
