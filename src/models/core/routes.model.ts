export interface Routes {
	// General
	'index': {
		path: '/'
	}
	'404': {
		path: '/:catchAll(.*)'
	}
	// Auth
	'login': {
		path: '/login'
	}
	'forgot-password': {
		path: '/forgot-password'
	}
	'reset-password': {
		path: '/reset-password/:token'
		params: {
			token: string
		}
		queryParams: {
			email: string
		}
	}
	// Example
	'example-index': {
		path: '/example'
	}
}
