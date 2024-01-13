<script setup lang="ts">
import type { z } from 'zod'

interface Props {
  errors?: z.ZodFormattedError<string> | null | undefined
  isTouched?: boolean
}

const { errors, isTouched = true } = defineProps<Props>()
</script>

<template>
  <AppHeightTransition :duration="200">
    <div v-if="errors != null && isTouched">
      <div class="mt-1 flex items-center gap-x-2">
        <AppIcon
          class="w-3.5 shrink-0 fill-white text-destructive"
          icon="warning"
        />

        <AppText
          v-if="errors != null"
          class="text-destructive"
          variant="subtext"
        >
          {{ errors._errors[0] }}
        </AppText>
      </div>
    </div>
  </AppHeightTransition>
</template>
