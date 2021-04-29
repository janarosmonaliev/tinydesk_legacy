# Change Log

## [0.0.3] - 2021-04-29

### Added

- Bookmark change position on drap and drop
- Bookmark move into different folder feature
- Movable notes, to-do lists and to-do items
- Add and delete bookmarks
- Delete a folder
- Changing location from settings
- Color tags are now visible as bookmark's border

### Fixed

- Bookmarks deletion bug fixed
- Bookmark url bug fixed
- Dialog height bug fixed

### Changed

- Widgets cannot be deleted from the app from now on

## [0.0.2] - 2021-04-22

### Added

- New responsive landing page
- Infinite scroll on background image search
- Save and cancellation of changing the background image
- Swithcing between folders
- Adding a new folder
- Fully functional To-Do List widget
- Layout edit state animation added

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
