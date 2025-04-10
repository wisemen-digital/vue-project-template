import { defineComponentVariant } from '@wisemen/vue-core-components'

export const primaryButtonVariant = defineComponentVariant({
  config: { },
  target: {
    prop: 'variant',
    value: 'primary',
  },
  component: 'button',
})
