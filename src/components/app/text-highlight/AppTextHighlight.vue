<script setup lang="ts">
import Highlighter from 'vue-highlight-words'

const props = defineProps<{
  searchTerm: string
  textToHighlight: string
}>()
</script>

<template>
  <div>
    <Highlighter
      :search-words="[props.searchTerm]"
      :text-to-highlight="props.textToHighlight"
      highlight-class-name="bg-brand-secondary"
    />
  </div>
</template>
