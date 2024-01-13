import { createPinia } from 'pinia'

import { piniaLogger } from './piniaLogger'

export const piniaPlugin = createPinia().use(piniaLogger())
