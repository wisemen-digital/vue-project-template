export enum QueryKey {
	CURRENT_USER = 'currentUser',
	EXAMPLE = 'example',
	TEST = 'test',
}

export interface QueryKeys {
	[QueryKey.CURRENT_USER]: void
	[QueryKey.EXAMPLE]: {
		exampleId: string
	}
	[QueryKey.TEST]: {
		testId: string
		testId2: string
	}
}
