import type { Component } from 'vue'

import type {
  Attrs,
  Modal,
  UseModalOptions,
  UseModalReturnType,
  UseModalsContainerReturnType,
} from '../types'
import { generateUuid } from '../utils'

const modals = ref<Modal[]>([])

export function useModalsContainer(): UseModalsContainerReturnType {
  return {
    modals,
  }
}

export function useModal<TComponent extends Record<string, unknown>>(options: UseModalOptions<TComponent>,
): UseModalReturnType<TComponent> {
  const modalId = `modal-${generateUuid()}`
  
  const removeModalFromDom = (): void => {
    modals.value = modals.value.filter(modal => modal.id !== modalId)
  }
  
  const closeModal = (): void => {
    const modal = modals.value.find(modal => modal.id === modalId) as Modal
    
    modal.isOpen = false
    
    setTimeout(removeModalFromDom, 500)
  }
  
  const createModal = async (attrs: Attrs<TComponent>): Promise<Ref<Modal>> => {
    const c = (await options.component())
    
    const component = computed<Component>(() => h(c.default as Component, reactive<Attrs<TComponent>>({
      ...attrs,
      modalId,
      onClose: closeModal,
    })))
    
    const modal = ref<Modal>({
      id: modalId,
      isOpen: false,
      component: markRaw(component) as any,
    })
    
    return modal
  }
  
  const openModal = async (attrs: Attrs<TComponent>): Promise<void> => {
    const modal = await createModal(attrs)
    
    modals.value.push(modal.value)
    
    setTimeout(() => {
      modal.value.isOpen = true
    })
  }
  
  return {
    modalId,
    openModal: openModal as any,
    closeModal,
  }
}
