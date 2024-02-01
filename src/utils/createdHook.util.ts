type onCreatedHookOptions = () => void

export function onCreated(cb: onCreatedHookOptions): void {
	cb()
}
