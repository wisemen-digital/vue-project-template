## [1.1.0] (2024-04-08)

### Fixes
- **environment:** rename `MODE` to `ENVIRONMENT` to correctly identify the current environment when building the app. 
- **env variables:** Move all env variable exports to vite-end.d.ts file and fix imports.
- **date:** remove unused date schema
- **currency:** remove unused currency utils
- **paginationParamsBuilder:** rename paginationBuilder file name to paginationParamsBuilder and fix imports.

## [1.0.0] (2024-04-01)

### Features
- **Models:** add `date`, `datetime`, `currency`, and `phoneNumber` models.
- **Services:** change from objects to classes for improved structure.
- **Transformers:** change from objects to classes for better organization.
- **DataProviderView:** add a view to manage loading and error states during data fetching.

### Improvements
- **useErrorToast:** added as a replacement for `useHandleApiError`.
- **Pagination:** implement `PaginationBuilder` as a preferred alternative to `usePaginationOptionsToApiParams`.
