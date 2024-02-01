<script setup lang="ts">
import AppText from '@/components/core/text/AppText.vue'

interface Props {
	tags: string[]
}

const { tags } = defineProps<Props>()
</script>

<template>
	<div>
		<ul class="flex items-center gap-x-2">
			<li
				v-for="tag of tags"
				:key="tag"
				class="rounded-2xl border border-solid border-border bg-muted-background px-2 py-1"
			>
				<AppText variant="caption">
					{{ tag }}
				</AppText>
			</li>
		</ul>
	</div>
</template>
