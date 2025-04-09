import type { VueQueryPluginOptions } from '@tanstack/vue-query'
import {
  QueryCache,
  QueryClient,
  VueQueryPlugin,
} from '@tanstack/vue-query'
import { useClipboard } from '@vueuse/core'
import { useVcToast } from '@wisemen/vue-core-components'
import type { App } from 'vue'

import { TEST_ID } from '@/constants/testId.constant.ts'
import { ApiErrorUtil } from '@/utils/apiError.util.ts'
import { LoggerUtil } from '@/utils/logger.util.ts'

export const queryClient = new QueryClient()

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
        const toast = useVcToast()

        const clipboard = useClipboard({ copiedDuring: 2000 })

        LoggerUtil.logError(error)

        if (error.name === 'ZodError') {
          toast.error({
            testId: TEST_ID.SHARED.MALFORMED_RESPONSE_TOAST,
            title: `Zod Error`,
            actions: [
              {
                label: clipboard.copied.value ? 'Copied!' : 'Copy error',
                onClick: (): void => {
                  void clipboard.copy(`API returned a malformed response.\n\n${JSON.stringify(error, null, 2)}`)
                },
              },
            ],
            description: `API returned a malformed response.`,
            icon: 'alertCircle',
          })

          return
        }

        if (ApiErrorUtil.isError(error)) {
          toast.error({
            title: 'Api Error',
            description: error.errors?.[0]?.detail,
            icon: 'alertCircle',
          })

          return
        }

        toast.error({
          title: 'Error',
          description: error.message,
          icon: 'alertCircle',
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
