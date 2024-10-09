export const TEST_ID = {
  APP_PAGE: {
    TITLE: 'app-page-title',
  },
  AUTH: {
    LOGIN: {
      EMAIL_INPUT: 'login-form-email-input',
      PASSWORD_INPUT: 'login-form-password-input',
      SUBMIT_BUTTON: 'login-form-submit-button',
    },
  },
  SHARED: {
    MALFORMED_RESPONSE_TOAST: 'shared-malformed-response-toast',
  },
  USERS: {
    CREATE: {
      SUCCESS_TOAST: 'users-create-success-toast',
    },
    DETAIL: {
      EDIT_BUTTON: 'users-detail-edit-button',
    },
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
        BIRTH_DATE: 'users-overview-title-birth-date',
        CONTAINER: 'users-overview-table-container',
        FULL_NAME: 'users-overview-title-full-name',
        UUID: 'users-overview-title-uuid',
      },
      TITLE: 'users-overview-title',
    },
    UPDATE: {
      SUCCESS_TOAST: 'users-update-success-toast',
    },
  },
} as const
