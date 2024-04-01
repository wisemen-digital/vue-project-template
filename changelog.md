## [1.0.0] (2024-04-01)

### Features
- **Models:** add `date`, `datetime`, `currency`, and `phoneNumber` models.
- **Services:** change from objects to classes for improved structure.
- **Transformers:** change from objects to classes for better organization.
- **DataProviderView:** add a view to manage loading and error states during data fetching.

### Improvements
- **useErrorToast:** added as a replacement for `useHandleApiError`.
- **Pagination:** implement `PaginationBuilder` as a preferred alternative to `usePaginationOptionsToApiParams`.
