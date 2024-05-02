## [1.1.3] (2024-04-25)
### Improvements
- **table** change table columns array to a computed value

## [1.1.2] (2024-04-21)
### Fixes
- **breadcrumbs** change breadcrumbs implementation to return a computed value to support proper locale switching.
- **pagination** now it actually works, oops.

### Improvements
- **dependency** bump `@wisemen/vue-core` from 0.37 to 0.55
- **refactor** rename `useErrorToast` to `useApiErrorToast`
- **form** - move `useUnsavedChanges` implementation to `AppForm`. Can be disabled via the `canExitWhenDirty` prop
- **router** change `useTypedRouteParams` and `useTypedRouteQuery` to return computed values instead of static values
- **sidebar** add optional keyboard shortcuts to sidebar

### Features
- **layout** add `FormLayout` component which should be used to wrap multiple `FormSection` components
- **layout** add `AppButtonGroup` component which should be used when displaying multiple buttons next to eachother
- **layout** add `AppDialogHeader`, `AppDialogContent`, `AppDialogActions` and a few more components to more easily build dialogs

## [1.1.1] (2024-04-15)

### Feature
- **sentry:** add errorHandler to sentry so that it doesn't block the build when sentry initialization fails.

## [1.1.0] (2024-04-08)

### Fixes
- **environment:** rename `MODE` to `ENVIRONMENT` to correctly identify the current environment when building the app. 
- **env variables:** Move all env variable exports to vite-end.d.ts file and fix imports.
- **date:** remove unused date schema
- **currency:** remove unused currency utils
- **PaginationDtoBuilder:** rename paginationBuilder file name to PaginationDtoBuilder and fix imports.

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
