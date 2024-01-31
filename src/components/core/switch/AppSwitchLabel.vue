<script setup lang="ts">
import { SwitchLabel } from '@headlessui/vue'
import { useAttrs } from 'vue'

import type { AppFormLabelProps } from '@/components/core/form-label/AppFormLabel.vue'
import AppFormLabel from '@/components/core/form-label/AppFormLabel.vue'

const props = defineProps<AppFormLabelProps>()
const attr = useAttrs()
</script>

<template>
	<SwitchLabel>
		<AppFormLabel
			v-bind="props"
			:class="attr.class"
		/>
	</SwitchLabel>
</template>
