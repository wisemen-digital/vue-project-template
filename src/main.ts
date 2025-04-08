import '@/assets/styles/base.css'
import '@fontsource-variable/inter'

import {
  extendIcons,
  setupDefaultStyles,
} from '@wisemen/vue-core'
import { extendIcons as extendIconsNext } from '@wisemen/vue-core-components'
import { createApp as createVueApp } from 'vue'

import App from '@/App.vue'
import { setupCustomStyles } from '@/component-styles'
import { setupMockServer } from '@/configs/mockServer.config.ts'
import { configureZod } from '@/configs/zod.config.ts'
import { icons } from '@/icons/icons.ts'
import { setupHttpClient } from '@/libs/http.lib.ts'
import { i18nPlugin } from '@/plugins/i18n.plugin.ts'
import { piniaPlugin } from '@/plugins/pinia.plugin.ts'
import { routerPlugin } from '@/plugins/router.plugin.ts'
import { vueQueryPlugin } from '@/plugins/vueQuery.plugin.ts'

extendIcons(icons)
extendIconsNext(icons)
configureZod()
setupDefaultStyles()
setupCustomStyles()

setupMockServer().then(() => {
  const app = createVueApp(App)

  app.use(i18nPlugin)
  app.use(piniaPlugin)
  app.use(routerPlugin)
  app.use(vueQueryPlugin)

  app.mount('#app')

  setupHttpClient()
})
