import type { MaybeRefOrGetter } from 'vue'

export enum QueryKey {
	CURRENT_USER = 'currentUser',

	// Users
	USERS = 'users',
	USERS_DETAIL = 'user-detail',
}

export interface QueryKeys {
	[QueryKey.CURRENT_USER]: void

	// Users
	[QueryKey.USERS]: {
		page: MaybeRefOrGetter<number>
	}
	[QueryKey.USERS_DETAIL]: {
		userUuid: MaybeRefOrGetter<string>
	}
}
