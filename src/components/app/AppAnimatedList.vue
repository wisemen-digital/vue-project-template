<script setup lang="ts" generic="TData extends { id: string }">
import { ref, watch } from 'vue'

import { BrowserUtil } from '@/utils/browser.util'

const props = defineProps<{
  data: TData[]
}>()

const data = ref<TData[]>(JSON.parse(JSON.stringify(props.data)))

watch(() => props.data, (newdata) => {
  if (!BrowserUtil.hasSupportForViewTransition()) {
    data.value = JSON.parse(JSON.stringify(newdata))

    return
  }

  document.startViewTransition(() => {
    data.value = JSON.parse(JSON.stringify(newdata))
  })
}, {
  deep: true,
})
</script>

<template>
  <div
    :style="{
      viewTransitionName: 'items',
    }"
  >
    <div
      v-for="item of data"
      :key="item.id"
      :style="{
        viewTransitionName: `item-${item.id}`,
      }"
    >
      <slot
        :item="item"
        name="item"
      />
    </div>
  </div>
</template>

<style>
::view-transition-group(*) {
  animation-duration: 0.5s;
  animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
}
</style>
