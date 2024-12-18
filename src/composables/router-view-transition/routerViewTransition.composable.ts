import { useRouter } from 'vue-router'

import { BrowserUtil } from '@/utils/browser.util'

export function useRouterViewTransition(): void {
  const router = useRouter()

  router.beforeResolve(() => {
    if (!BrowserUtil.hasSupportForViewTransition()) {
      return
    }

    let changeRoute: () => void
    const ready = new Promise<void>((resolve) => (changeRoute = resolve))

    document.startViewTransition(() => {
      changeRoute()
    })

    return ready
  })
}
