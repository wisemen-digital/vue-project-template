## [1.0.0] (2024-04-01)

### Features
- **models:** add `date`, `datetime`, `currency`, and `phoneNumber` models.
- **services:** change from objects to classes for improved structure.
- **transformers:** change from objects to classes for better organization.
- **DataProviderView:** add a view to manage loading and error states during data fetching.

### Improvements
- **useErrorToast:** use in favor `useHandleApiError`.
- **pagination:** implement `PaginationBuilder` as a preferred alternative to `usePaginationOptionsToApiParams`.
- **architecture** rename plural folder and files to singular. E.g. `UsersCreateForm.vue` -> `UserCreateForm.vue`
