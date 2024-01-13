<script setup lang="ts">
import {
  onMounted,
  ref,
} from 'vue'

import { useModalsContainer } from '@/ui/composables'

const { modals } = useModalsContainer()
const isMounted = ref<boolean>(false)

onMounted(() => {
  isMounted.value = true
})
</script>

<template>
  <Teleport
    v-if="isMounted"
    to="body"
  >
    <Component
      :is="modal.component"
      v-for="modal of modals"
      :key="modal.id"
      v-model:is-open="modal.isOpen"
    />
  </Teleport>
</template>
