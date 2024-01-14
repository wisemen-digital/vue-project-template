export interface Routes {
	// General
	'index': {
		path: '/'
	}
	'404': {
		path: '/:catchAll(.*)'
	}
	// Auth
	'login-form': {
		path: '/login'
	}
	'forgot-password-form': {
		path: '/forgot-password'
	}
	'reset-password-form': {
		path: '/reset-password/:token'
		params: {
			token: string
		}
	}
	// Example
	'example-index': {
		path: '/example'
	}
}
