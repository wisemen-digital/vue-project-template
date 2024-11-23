<script setup lang="ts" generic="TData extends { id: string }">
import { ref, watch } from 'vue'

const props = defineProps<{
  data: TData[]
}>()

const data = ref<TData[]>(JSON.parse(JSON.stringify(props.data)))

watch(() => props.data, (newdata) => {
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

<style lang="scss">
::view-transition-group(*) {
  animation-duration: 0.5s;
}

// ::view-transition-group(*) {
//   animation-duration: 1s;
// }

// ::view-transition-old(*) {
//   animation-duration: 1s;
// }

// ::view-transition-new(*) {
//   animation-duration: 1s;
// }
</style>
