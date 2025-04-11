<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import {
  VcButton,
  VcIcon,
  VcTableCell,
  VcTooltip,
} from '@wisemen/vue-core-components'
import { useI18n } from 'vue-i18n'

import AppGrid from '@/components/app/grid/AppGrid.vue'

const props = defineProps<{
  content: unknown
}>()

const i18n = useI18n()

const clipboard = useClipboard()

function onClick(): void {
  clipboard.copy(JSON.stringify(props.content))
}
</script>

<template>
  <VcTableCell class="gap-md flex">
    <VcTooltip
      :class-config="{
        innerContent: 'bg-fg-primary border-transparent max-h-100 w-150 overflow-auto',
        arrow: 'bg-fg-primary border-transparent',
      }"
      :delay-duration="200"
    >
      <template #trigger>
        <div class="flex items-center justify-center">
          <VcIcon
            icon="infoCircle"
            class="size-5"
          />
        </div>
      </template>

      <template #content>
        <AppGrid
          :cols="1"
          class="p-lg items-start"
        >
          <VcButton
            :class-config="{
              root: 'bg-fg-primary border-transparent',
            }"
            :label="i18n.t('shared.info')"
            :icon="clipboard.copied.value ? 'check' : 'infoCircle'"
            icon-left="copy"
            @click="onClick"
          >
            {{ i18n.t('shared.copy_to_clipboard') }}
          </VcButton>
          <pre class="text-primary-on-brand text-xs">{{ props.content }}</pre>
        </AppGrid>
      </template>
    </VcTooltip>
  </VcTableCell>
</template>
