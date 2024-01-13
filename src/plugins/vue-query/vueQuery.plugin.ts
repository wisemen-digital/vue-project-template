import {
  VueQueryPlugin,
  type VueQueryPluginOptions,
} from '@tanstack/vue-query'
import type { App } from 'vue'

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  },
}

export const vueQueryPlugin: {
  install: (app: App) => void
} = {
  install: (app: App): void => {
    app.use(VueQueryPlugin, vueQueryPluginOptions)
  },
}
