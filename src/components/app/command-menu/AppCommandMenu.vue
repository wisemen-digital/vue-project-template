<script  lang="ts" setup="">
import { VcIcon, VcTextField } from '@wisemen/vue-core'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const searchInput = ref<string>('')

const isOpen = defineModel('isOpen', {
  required: true,
})
</script>

<template>
  <div
    v-if="isOpen"
    class="absolute top-0 bg-black/20 flex w-full h-full justify-center items-center h-full w-full z-10"
  />
  <transition
    enter-from-class="scale-120 blur-md"
    enter-active-class="transition duration-300 ease-[cubic-bezier(0.39,0.19,0,1)]"
  >
    <div
      v-if="isOpen"
      class="absolute top-0   bg-gradient-to-tr z-20 from-gray-900/90 to-gray-600/90 rounded-xl text-white w-200 backdrop-blur-xs"
    >
      <div class="p-2">
        <VcTextField
          v-model="searchInput"
          icon-left="search"
          class="text-field-transparent"
        />
      </div>
      <div class="bg-gray-500 h-[1px] w-full" />
      <div class="p-6 flex flex-col gap-6">
        <p
          class="text-sm text-gray-300"
        >
          {{ t('command_menu.common_actions.title') }}
        </p>
        <div class="flex gap-4">
          <div class="border border-solid border-gray-500 rounded-md w-fit p-3 h-fit">
            <VcIcon
              class="size-4 text-gray-300"
              icon="alertCircle"
            />
          </div>
          <div>
            <p class="text-sm">
              Lorem ipsum dolor.
            </p>
            <p
              class="text-xs text-gray-300"
            >
              Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
