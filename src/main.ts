import '@/assets/styles/index.scss'
import '@fontsource/dm-mono/400.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/700.css'

import { createApp as createVueApp } from 'vue'

import App from '@/App.vue'
import { configureDayjs } from '@/configs/dayjs.config.ts'
import { configureZod } from '@/configs/zod.config.ts'
import { i18nPlugin } from '@/plugins/i18n/i18n.plugin.ts'
import { piniaPlugin } from '@/plugins/pinia/pinia.plugin.ts'
import { routerPlugin } from '@/plugins/router/router.plugin.ts'
import { vueQueryPlugin } from '@/plugins/vue-query/vueQuery.plugin.ts'

configureDayjs()
configureZod()

createVueApp(App).use(i18nPlugin).use(piniaPlugin).use(routerPlugin).use(vueQueryPlugin).mount('#app')
