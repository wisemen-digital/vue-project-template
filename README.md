# Wisemen Vue Project Template

This templated will help you to create great applications at Wisemen.

### Table of contents
- [Recommended IDE Setup](#recommended-ide-setup)
- [Project setup](#project-setup)
    - [Clone repo and install dependencies](#clone-repo-and-install-dependencies) 
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Clean the project before pushing changes](#clean-the-project-before-pushing-changes)
- [Structure](#structure)
- [Components](#components)
- [Authentication](#authentication)
- [Code Style](#code-style)
- [Testing your application](#testing-your-application)
  - [Unit Tests](#unit-tests)
  - [E2E Tests](#e2e-tests)
- [Debugging your application](#debugging-your-application)
  - [Vue Devtools](#vue-devtools)
  - [A full reload happens instead of HMR](#a-full-reload-happens-instead-of-hmr)
  - [Check the project bundle](#check-the-project-bundle)

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
- [Webstorm](https://www.jetbrains.com/webstorm/)

## Project setup

#### Clone repo and install dependencies
```
pnpm install
```

#### Compiles and hot-reloads for development
```
pnpm dev
```

#### Clean the project before pushing changes
This command will automatically run the linting, type checking, unit tests, e2e tests, and build the project.
```
pnpm clean
```

## Structure
The application uses a module based structure with vertical slices (features).

Each vertical slice is a folder in the `src/modules` directory.
Each module contains multiple features which group together related functionality.

- `components`: contains the components used in the vertical slice.
- `api/services`: services for fetching data from the backend.
- `api/queries`: queries for handling server state cache
- `api/mutations`: mutations for handling actions (create, update, delete) on the server
- `views`: contains the pages used in the vertical slice.
- `services`: contains the services used in the vertical slice.

## Components
The project template uses the Wisemen component library. TODO @robbe

## Authentication
The project template uses the Wisemen authentication library. TODO @wouter

## Code Style
The project template uses the [Wisemen ESLint configuration](https://github.com/wisemen-digital/eslint-config-vue) for automatic code formatting and linting.

TODO add our preferences and examples

## Testing your application

### Unit Tests
Unit tests are written using Vitest. To run the unit tests, run:
```
pnpm test:unit
```

### E2E Tests
E2E tests are written using Playwright. To run the e2e tests, run:
```
pnpm test:e2e
```

## Debugging your application

### Vue Devtools
The project template comes with Vue Devtools installed. To use it, install the [Vue Devtools extension](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg) for Chrome.

### A full reload happens instead of HMR
- If HMR is not handled by Vite or a plugin, a full reload will happen as it's the only way to refresh the state.
- If HMR is handled but it is within a circular dependency, 
a full reload will also happen to recover the execution order. 

To solve this, try breaking the loop. 
You can run `vite --debug hmr` to log the circular dependency path if a file change triggered it.

### Check the project bundle
We can use the [vite-bundle-visualizer](https://www.npmjs.com/package/vite-bundle-visualizer) to check the project bundle.
```
npx vite-bundle-visualizer
```
