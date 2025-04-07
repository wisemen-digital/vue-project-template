<script setup lang="ts">
import type { Icon } from '@wisemen/vue-core'
import { VcIcon } from '@wisemen/vue-core'

import AppGroup from '@/components/app/group/AppGroup.vue'

const props = defineProps<{
  icon: Icon
  label?: string
}>()
</script>

<template>
  <AppGroup>
    <div
      class="
        p-sm flex items-center justify-center rounded-md border border-white/20
        bg-white/10
      "
    >
      <VcIcon
        :icon="props.icon"
        class="size-3 text-white/80"
      />
    </div>
    <span
      v-if="props.label !== undefined"
      class="shrink-0 text-xs text-white/80"
    >
      {{ props.label }}
    </span>
  </AppGroup>
</template>
