export const TEST_ID = {
  APP_PAGE: {
    TITLE: 'app-page-title',
    USER_BUTTON: 'app-page-user-button',
    USER_NAME: 'app-page-user-name',
  },
  AUTH: {
    CALLBACK: 'auth-callback',
    LOGIN: {
      EMAIL_INPUT: 'login-form-email-input',
      PASSWORD_INPUT: 'login-form-password-input',
      SUBMIT_BUTTON: 'login-form-submit-button',
    },
  },
  CONTACTS: {
    CREATE: { SUCCESS_TOAST: 'contacts-create-success-toast' },
    DETAIL: {
      DELETE_BUTTON: 'contacts-detail-delete-button',
      EDIT_BUTTON: 'contacts-detail-edit-button',
    },
    FORM: {
      EMAIL_INPUT: 'contacts-form-email-input',
      FIRST_NAME_INPUT: 'contacts-form-first-name-input',
      IS_ACTIVE_CHECKBOX: 'contacts-form-is-active-checkbox',
      LAST_NAME_INPUT: 'contacts-form-last-name-input',
      PHONE_INPUT: 'contacts-form-phone-input',
      SUBMIT_BUTTON: 'contacts-form-submit-button',
      TITLE: 'contacts-form-title',
    },
    OVERVIEW: {
      CREATE_BUTTON: 'contacts-overview-create-button',
      TITLE: 'contacts-overview-title',
    },
    TABLE: {
      ADDRESS: 'contacts-overview-table-address',
      CONTAINER: 'contacts-overview-table-container',
      EMAIL_LINK: 'contacts-overview-table-email-link',
      NAME_LINK: 'contacts-overview-table-name-link',
      PHONE_LINK: 'contacts-overview-table-phone-link',
    },
    UPDATE: { SUCCESS_TOAST: 'contacts-update-success-toast' },
  },
  SHARED: { MALFORMED_RESPONSE_TOAST: 'shared-malformed-response-toast' },
  USERS: {
    CREATE: { SUCCESS_TOAST: 'users-create-success-toast' },
    DETAIL: { EDIT_BUTTON: 'users-detail-edit-button' },
    FORM: {
      BIRTH_DATE_INPUT: 'users-form-birth-date-input',
      FIRST_NAME_INPUT: 'users-form-first-name-input',
      LAST_NAME_INPUT: 'users-form-last-name-input',
      SUBMIT_BUTTON: 'users-form-submit-button',
      TITLE: 'users-form-title',
    },
    OVERVIEW: {
      CREATE_BUTTON: 'users-overview-create-button',
      TABLE: {
        CONTAINER: 'users-overview-table-container',
        EMAIL: 'users-overview-table-email',
      },
      TITLE: 'users-overview-title',
    },
    UPDATE: { SUCCESS_TOAST: 'users-update-success-toast' },
  },
} as const
