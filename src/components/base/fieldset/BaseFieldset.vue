<script setup lang="ts">
import { useId } from 'vue'

import { useProvideBaseFieldsetContext } from '@/components/base/fieldset/baseFieldset.context'

const id = useId()

useProvideBaseFieldsetContext({ id })
</script>

<template>
  <fieldset :aria-describedby="id">
    <slot />
  </fieldset>
</template>
