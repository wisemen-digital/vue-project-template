import '@/assets/styles/index.scss'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/dm-mono/400.css'

import { createApp as createVueApp } from 'vue'

import App from '@/App.vue'
import {
  configureDayjs,
  configureZod,
} from '@/configs'
import {
  i18nPlugin,
  piniaPlugin,
  routerPlugin,
  vueQueryPlugin,
} from '@/plugins'

configureDayjs()
configureZod()

createVueApp(App)
  .use(i18nPlugin)
  .use(piniaPlugin)
  .use(routerPlugin)
  .use(vueQueryPlugin)
  .mount('#app')
