import '@wisemen/vue-core/style.css'
import '@/assets/styles/index.scss'
import '@fontsource-variable/inter'

import { extendIcons } from '@wisemen/vue-core'
import { createApp as createVueApp } from 'vue'

import App from '@/App.vue'
import { configureDayjs } from '@/configs/dayjs.config.ts'
import { configureZod } from '@/configs/zod.config.ts'
import { i18nPlugin } from '@/plugins/i18n/i18n.plugin.ts'
import { piniaPlugin } from '@/plugins/pinia/pinia.plugin.ts'
import { routerPlugin } from '@/plugins/router/router.plugin.ts'
import { configureSentry } from '@/plugins/sentry/sentry.plugin.ts'
import { vueQueryPlugin } from '@/plugins/vue-query/vueQuery.plugin.ts'

import { icons } from './icons/icons'

extendIcons(icons)
configureDayjs()
configureZod()

const app = createVueApp(App)

app.use(i18nPlugin)
app.use(piniaPlugin)
app.use(routerPlugin)
app.use(vueQueryPlugin).mount('#app')

configureSentry(app)
