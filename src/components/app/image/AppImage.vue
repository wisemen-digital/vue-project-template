<script setup lang="ts">
import AppFocusable from '@/components/app/focusable/AppFocusable.vue'
import { useModal } from '@/composables/modal/modal.composable.ts'

const props = withDefaults(
  defineProps<{
    alt?: null | string
    disableEnlargeOnClick?: boolean
    src: string
  }>(),
  {
    alt: null,
    disableEnlargeOnClick: false,
  },
)

const { modalId, openModal } = useModal({
  component: () => import('../image/AppImageModal.vue'),
})

function onClick(): void {
  if (props.disableEnlargeOnClick) {
    return
  }

  void openModal({
    alt: props.alt,
    src: props.src,
  })
}
</script>

<template>
  <Component
    :is="disableEnlargeOnClick ? 'div' : AppFocusable"
    :id="modalId"
    @click="onClick"
  >
    <img
      :alt="props.alt ?? undefined"
      :src="props.src"
      class="rounded"
    >
  </Component>
</template>
