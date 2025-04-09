<script setup lang="ts" generic="T">
import {
  VcIconButton,
  VcTextField,
} from '@wisemen/vue-core-components'
import {
  computed,
  ref,
} from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<{
  isDisabled?: boolean
  isLoading?: boolean
  disableKeyboardCommand?: boolean
  modelValue: string
  placeholder?: string | null
}>(), {
  isDisabled: false,
  disableKeyboardCommand: false,
  placeholder: null,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const i18n = useI18n()

const search = computed<string>({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const VcTextFieldRef = ref<InstanceType<any> | null>(null)

function onClearInput(): void {
  search.value = ''
}
</script>

<template>
  <VcTextField
    ref="VcTextFieldRef"
    v-model="search"
    :is-disabled="props.isDisabled"
    :placeholder="props.placeholder ?? i18n.t('component.search_input.placeholder')"
    :is-loading="props.isLoading && search.length > 0"
    icon-left="search"
  >
    <template #right>
      <div>
        <VcIconButton
          v-if="search !== null && search !== '' && !props.isLoading"
          :label="i18n.t('component.search_input.clear')"
          variant="tertiary"
          size="sm"
          icon="close"
          class="mr-[0.1875rem]"
          @click="onClearInput"
        />
      </div>
    </template>
  </VcTextField>
</template>
