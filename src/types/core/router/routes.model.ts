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
	// Customers
	'customers-overview': {
		path: '/customers'
	}
	'customers-create': {
		path: '/customer/create'
	}

	//Vacancies
	'vacancies-overview': {
		path: '/vacancies'
	}

	//Students
	'students-overview': {
		path: '/students'
	}

	//Matching
	'matching-overview': {
		path: '/matching'
	}
}
