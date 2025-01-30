import type {
  BreadcrumbItem,
  VcButtonProps,
} from '@wisemen/vue-core'
import {
  type ComputedRef,
  ref,
} from 'vue'

type PageHeaderAction = VcButtonProps & {
  label: string
  onClick: () => void
}

export interface PageHeader {
  title: string
  actions: PageHeaderAction[]
  breadcrumbs: BreadcrumbItem[]
}

const config = ref<PageHeader | null>(null)

export function usePageHeaderConfig(): ComputedRef<PageHeader | null> {
  return config as ComputedRef<PageHeader | null>
}

export function usePageHeader(pageHeaderConfig: ComputedRef<PageHeader>): void {
  config.value = pageHeaderConfig.value
}
