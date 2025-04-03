<script setup lang="ts">
import { VisuallyHidden } from 'reka-ui'

import BaseFieldset from '@/components/base/fieldset/BaseFieldset.vue'
import BaseFieldsetLegend from '@/components/base/fieldset/BaseFieldsetLegend.vue'

const props = withDefaults(
  defineProps<{
    title: string
    isTitleHidden?: boolean
    description?: string | null
  }>(),
  {
    isTitleHidden: false,
    description: null,
  },
)
</script>

<template>
  <BaseFieldset>
    <div class="mb-lg">
      <Component :is="props.isTitleHidden ? VisuallyHidden : 'div'">
        <BaseFieldsetLegend
          as="h2"
          class="text-primary text-sm font-medium"
        >
          {{ props.title }}
        </BaseFieldsetLegend>
      </Component>

      <p
        v-if="props.description !== null"
        class="mt-sm text-secondary text-sm"
      >
        {{ props.description }}
      </p>
    </div>

    <div class="col-span-2">
      <slot />
    </div>
  </BaseFieldset>
</template>
