# Change Log

## [0.0.2] - 2021-04-22

### Fixed

- Inconsistensies with `withStyles` package in production mode were fixed by injecting `@material-ui` styles first in `gatsby-config.js`

```javascript
{
    resolve: `gatsby-plugin-material-ui`,
    options: {
    stylesProvider: {
        injectFirst: true,
    },
    },
},
```

## [0.0.1] - 2021-03-29

### Added

- Responsive layout that encapsulates 16 components
- Fundamental functionality
- Typography hierarchy system
- Spacing hierarchy system
- Search Engine Optimization
- Added `lighthouse-check` action to perform performance test after `build-test`

### Changed

- Gatsby build test action publishes to `gh-pages`
- React updated to `v16.12` to support `useImperativeHandle()` hook. It is needed for parent-to-child, or top-down communication.

## [Unreleased] - 2021-03-12

### Added

- Safari Extension built with Swift

## [Unreleased] - 2021-03-05

### Added

- Add Gatsby build test action
- Configure Material-UI, add Feather Icons
- Set up Gatsby environment
