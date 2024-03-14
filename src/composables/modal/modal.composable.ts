import type { Component, Ref } from 'vue'
import {
  computed,
  h,
  markRaw,
  reactive,
  ref,
} from 'vue'

import type {
  Attrs,
  Modal,
  UseModalOptions,
  UseModalReturnType,
  UseModalsContainerReturnType,
} from '@/types/modal/useModal.type'
import { generateUuid } from '@/utils/uuid/generateUuid.util.ts'

const modals = ref<Modal[]>([])

export function useModalsContainer(): UseModalsContainerReturnType {
  return {
    modals,
  }
}

export function useModal<TComponent extends Record<string, unknown>>(options: UseModalOptions<TComponent>,
): UseModalReturnType<TComponent> {
  const modalId = `modal-${generateUuid()}`

  function removeModalFromDom(): void {
    modals.value = modals.value.filter(modal => modal.id !== modalId)
  }

  function closeModal(): void {
    const modal = modals.value.find(modal => modal.id === modalId) as Modal

    modal.isOpen = false

    setTimeout(removeModalFromDom, 500)
  }

  async function createModal(attrs: Attrs<TComponent>): Promise<Ref<Modal>> {
    const c = await options.component()

    const component = computed<Component>(() => {
      return h(
        c.default as Component,
        reactive<Attrs<TComponent>>({
          ...attrs,
          modalId,
          onClose: closeModal,
        }),
      )
    })

    return ref<Modal>(<Modal>{
      component: markRaw(component) as Component,
      id: modalId,
      isOpen: false,
    })
  }

  async function openModal(attrs: Attrs<TComponent>): Promise<void> {
    const modal = await createModal(attrs)

    modals.value.push(modal.value)

    setTimeout(() => {
      modal.value.isOpen = true
    })
  }

  return {
    closeModal,
    modalId,
    openModal: openModal as unknown as UseModalReturnType<TComponent>['openModal'],
  }
}
