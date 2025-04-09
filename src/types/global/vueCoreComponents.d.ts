import * as componentVariants from '@/component-variants'

const componentVariantArray = Object.values(componentVariants)

declare module '@wisemen/vue-core-components' {
  interface ComponentVariants {
    variants: typeof componentVariantArray
  }
}
