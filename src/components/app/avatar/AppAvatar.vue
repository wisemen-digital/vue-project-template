<script setup lang="ts">
import { AppText } from '@wisemen/vue-core'
import { computed } from 'vue'

const props = defineProps<{
  firstName: string
  lastName: string
}>()

const userInitials = computed<string>(() => {
  const firstNameLetter = props.firstName[0]
  const lastNameLetter = props.lastName[0]

  return `${firstNameLetter}${lastNameLetter}`
})
</script>

<template>
  <div class="flex aspect-square size-8 items-center justify-center rounded-full bg-primary">
    <AppText
      variant="caption"
      as="span"
      class="font-medium text-primary-foreground"
    >
      {{ userInitials }}
    </AppText>
  </div>
</template>
