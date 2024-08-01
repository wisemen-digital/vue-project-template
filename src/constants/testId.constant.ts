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
  USERS: {
    FORM: {
      BIRTH_DATE_INPUT: 'users-form-birth-date-input',
      FIRST_NAME_INPUT: 'users-form-first-name-input',
      LAST_NAME_INPUT: 'users-form-last-name-input',
      SAVE_BUTTON: 'users-form-save-button',
    },
    OVERVIEW: {
      CREATE_BUTTON: 'users-overview-create-button',
      TABLE: {
        BIRTH_DATE: 'users-overview-title-birth-date',
        FULL_NAME: 'users-overview-title-full-name',
        UUID: 'users-overview-title-uuid',
      },
      TITLE: 'users-overview-title',
    },
  },
} as const
