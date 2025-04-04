<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import {
  VcIconButton,
  VcTableCell,
  VcTooltip,
} from '@wisemen/vue-core'
import { useI18n } from 'vue-i18n'

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
    <VcTooltip :delay-duration="200">
      <template #trigger>
        <VcIconButton
          :label="i18n.t('shared.info')"
          :icon="clipboard.copied.value ? 'clipboardCheck' : 'infoCircle'"
          :variant="clipboard.copied.value ? 'tertiary-color' : 'tertiary'"
          @click="onClick"
        />
      </template>

      <template #content>
        <div class="p-lg">
          <pre class="text-primary-on-brand text-xs">{{ props.content }}</pre>
        </div>
      </template>
    </VcTooltip>
  </VcTableCell>
</template>
