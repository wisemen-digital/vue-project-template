import type { MaybeRefOrGetter } from 'vue'

import type { PaginationApiParams } from '../pagination.type'

export enum QueryKey {
	CURRENT_USER = 'currentUser',

	// Users
	USERS = 'users',
	USERS_DETAIL = 'user-detail',
}

export interface QueryKeys {
	[QueryKey.CURRENT_USER]: void

	// Users
	[QueryKey.USERS]: PaginationApiParams
	[QueryKey.USERS_DETAIL]: {
		userUuid: MaybeRefOrGetter<string>
	}
}
