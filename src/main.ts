import '@/assets/styles/base.css'
import '@fontsource-variable/inter'

import {
  extendIcons,
  setupDefaultStyles,
} from '@wisemen/vue-core'
import type { AxiosStatic } from 'axios'
import { createApp as createVueApp } from 'vue'

import App from '@/App.vue'
import { client } from '@/client'
import { setupCustomStyles } from '@/component-styles'
import { setupMockServer } from '@/configs/mockServer.config.ts'
import { configureZod } from '@/configs/zod.config.ts'
import { API_BASE_URL } from '@/constants/environment.constant.ts'
import { icons } from '@/icons/icons.ts'
import { axios } from '@/libs/axios.lib.ts'
import { i18nPlugin } from '@/plugins/i18n/i18n.plugin.ts'
import { piniaPlugin } from '@/plugins/pinia/pinia.plugin.ts'
import { routerPlugin } from '@/plugins/router/router.plugin.ts'
import { vueQueryPlugin } from '@/plugins/vue-query/vueQuery.plugin.ts'

extendIcons(icons)
configureZod()
setupDefaultStyles()
setupCustomStyles()

setupMockServer().then(() => {
  const app = createVueApp(App)

  app.mount('#app')

  app.use(i18nPlugin)
  app.use(piniaPlugin)
  app.use(routerPlugin)
  app.use(vueQueryPlugin)

  app.mount('#app')

  client.setConfig({
    axios: axios as AxiosStatic,
    baseURL: API_BASE_URL,
  })
})
