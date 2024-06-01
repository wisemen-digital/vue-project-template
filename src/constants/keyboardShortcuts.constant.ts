import { KeyboardShortcutConfig } from '@wisemen/vue-core'

export const KEYBOARD_SHORTCUT = {
  EDIT: {
    keys: [
      'e',
    ],
  },
  NEW: {
    keys: [
      'n',
    ],
  },
  SAVE: {
    keys: [
      'ctrl',
      's',
    ],
  },
  SEARCH: {
    keys: [
      'meta',
      'f',
    ],
    preventDefault: true,
  },
  USER_OVERVIEW: {
    keys: [
      'g',
      'u',
    ],
  },
} satisfies Record<string, KeyboardShortcutConfig>
