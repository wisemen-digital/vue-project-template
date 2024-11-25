import '@/assets/styles/base.css'
import '@fontsource-variable/inter'

import {
  extendIcons,
  setupDefaultStyles,
} from '@wisemen/vue-core'
import { createApp as createVueApp } from 'vue'

import App from '@/App.vue'
import { setupCustomStyles } from '@/component-styles'
import { configureZod } from '@/configs/zod.config.ts'
import { icons } from '@/icons/icons.ts'
import { i18nPlugin } from '@/plugins/i18n/i18n.plugin.ts'
import { piniaPlugin } from '@/plugins/pinia/pinia.plugin.ts'
import { routerPlugin } from '@/plugins/router/router.plugin.ts'
import { vueQueryPlugin } from '@/plugins/vue-query/vueQuery.plugin.ts'

extendIcons(icons)
configureZod()
setupDefaultStyles()
setupCustomStyles()

const app = createVueApp(App)

app.use(i18nPlugin)
app.use(piniaPlugin)
app.use(routerPlugin)
app.use(vueQueryPlugin)

app.mount('#app')
