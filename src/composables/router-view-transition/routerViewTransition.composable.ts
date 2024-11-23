import {
  type RouteLocationNormalized,
  type Router,
  START_LOCATION,
} from 'vue-router'

// TODO: consider refactoring into single utility
// See https://github.com/nuxt/nuxt/tree/main/packages/nuxt/src/pages/runtime/utils.ts#L8-L19
function generateRouteKey(route: RouteLocationNormalized): string {
  const source = route?.meta.key ?? route.path
    .replace(/(:\w+)\([^)]+\)/g, '$1')
    .replace(/(:\w+)[?+*]/g, '$1')
    .replace(/:\w+/g, (r) => route.params[r.slice(1)]?.toString() || '')

  return typeof source === 'function' ? source(route) : source
}

/**
 * Utility used within router guards
 * return true if the route has been changed with a page change during navigation
 */
export function isChangingPage(to: RouteLocationNormalized, from: RouteLocationNormalized): boolean {
  if (to === from || from === START_LOCATION) {
    return false
  }

  // If route keys are different then it will result in a rerender
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true
  }

  const areComponentsSame = to.matched.every((comp, index) =>
    comp.components && comp.components.default === from.matched[index]?.components?.default)

  if (areComponentsSame) {
    return false
  }

  return true
}

export function useRouterViewTransition(router: Router): void {
  if (!document.startViewTransition) {
    return
  }

  let finishTransition: (() => void) | undefined
  let abortTransition: (() => void) | undefined

  router.beforeResolve((to, from) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const prefersNoTransition = prefersReducedMotion

    if (prefersNoTransition || !isChangingPage(to, from)) {
      return
    }

    const promise = new Promise<void>((resolve, reject) => {
      finishTransition = resolve
      abortTransition = reject
    })

    let changeRoute: () => void
    const ready = new Promise<void>((resolve) => (changeRoute = resolve))

    const transition = document.startViewTransition!(() => {
      changeRoute()

      return promise
    })

    transition.finished.then(() => {
      abortTransition = undefined
      finishTransition = undefined
    })

    return ready
  })

  router.afterEach(() => {
    finishTransition?.()
    finishTransition = undefined
  })

  router.onError(() => {
    abortTransition?.()
    abortTransition = undefined
  })
}

export interface ViewTransition {
  finished: Promise<void>
  ready: Promise<void>
  updateCallbackDone: Promise<void>
}
