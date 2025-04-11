<script setup lang="ts">
import {
  VcIcon,
  VcTextField,
} from '@wisemen/vue-core-components'
import { Motion } from 'motion-v'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  isLoading: boolean
  isOpenAnimationFinished: boolean
}>()

const i18n = useI18n()

const modelValue = defineModel<string>({ required: true })
</script>

<template>
  <Motion
    layout
  >
    <VcTextField
      v-model="modelValue"
      :is-loading="props.isLoading"
      :placeholder="i18n.t('component.global_search.placeholder')"
      :class-config="{
        input: 'pl-md text-md text-white placeholder:text-white/50',
        root: 'border-0 shadow-none outline-none h-auto px-0 py-2xl border-b border-solid !border-white/50 rounded-none bg-transparent',
      }"
    >
      <template #left>
        <VcIcon
          icon="search"
          class="ml-lg size-5 text-white/70"
        />
      </template>
    </VcTextField>
  </Motion>
</template>
