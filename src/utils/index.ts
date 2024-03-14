const isMacOS = window.navigator.platform.toUpperCase().includes('MAC')

const commandKey = isMacOS ? '⌘' : 'Ctrl'

export const shortcutMessage = `(${commandKey} + K)`
