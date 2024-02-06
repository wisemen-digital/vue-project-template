import { computed } from 'vue'

import type { ClientType } from '@/models/clients/client.model.ts'
import { i18nPlugin } from '@/plugins/i18n/i18n.plugin.ts'

interface DataItem<T> {
	value: T
	label: string
}

export const CLIENT_TYPE_ITEMS = computed<DataItem<ClientType>[]>(() => {
	const { t } = i18nPlugin.global

	return [
		{ value: 'b2b', label: t('shared.b2b') },
		{ value: 'b2g', label: t('shared.b2g') },
	]
})
