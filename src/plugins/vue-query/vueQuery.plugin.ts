import {
  QueryCache,
  VueQueryPlugin,
  type VueQueryPluginOptions,
} from '@tanstack/vue-query'
import { useClipboard } from '@vueuse/core'
import { useToast } from '@wisemen/vue-core'
import type { App } from 'vue'
import { computed } from 'vue'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { LoggerUtil } from '@/utils/logger.util.ts'

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error): void => {
        const toast = useToast()
        const clipboard = useClipboard({
          copiedDuring: 2000,
        })

        LoggerUtil.logError(error)

        toast.error({
          testId: TEST_ID.SHARED.MALFORMED_RESPONSE_TOAST,
          action: {
            label: computed<string>(() => clipboard.copied.value ? 'Copied!' : 'Copy error'),
            onClick: () => {
              void clipboard.copy(`API returned a malformed response.\n\n${JSON.stringify(error, null, 2)}`)
            },
          },
          icon: 'alertCircle',
          message: `API returned a malformed response.`,
        })
      },
    }),
  },
}

export const vueQueryPlugin: {
  install: (app: App) => void
} = {
  install: (app: App): void => {
    app.use(VueQueryPlugin, vueQueryPluginOptions)
  },
}
