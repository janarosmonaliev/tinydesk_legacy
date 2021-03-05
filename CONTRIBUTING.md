# Getting Started

We will be using [GatsbyJS](https://www.gatsbyjs.com/docs/how-to/) as a core front-end framework and [Material UI](https://material-ui.com/getting-started/installation/) as a helper design tool. Install dependencies and start a development server:

```
npm install && npm start
```

## Commit messages

Please use an imperatative mood in your commit messages. It is a verb form that makes a command or an instruction. Don't write "React component changed". Write "Change React component".

A proper commit message should complete the following sentence:  
_- If applied, this commit will_ `your message`  
_- If applied, this commit will **Change React component**_  
_- If applied, this commit will **~~React component changed~~**_

## Change Log

We will document important changes to the project on a weekly basis to [CHANGELOG.md](CHANGELOG.md). If there is no substantial progress made on a particular week, change log can be omitted.

**Format:**

## [version] - yyyy-mm-dd

Important notes from KGB team.

### Added

- Add Gatsby starter to the repo

### Changed

- Change site metadata

### Fixed

- Fix gatsby-build-test Github action

## Development

### React

Since GatsbyJS utilizes React, please familiarize yourself with [React Hooks](https://reactjs.org/docs/hooks-reference.html). It is an easier way manage state and refs within components.

### Folder Structure

- `src/components` - React components
- `src/pages` - pages that will be generated
- `src/style.sccs` - global styling with Sass
- `gatsby-config.js` - plugins configuration and site metadata

### Gatsby Related

Please note that `gatsby build` might not behave in the same way as `gatsby develop`. Inconsistencies usually arise during HTML builds. Gatsby has a [guideline on debugging these issues](https://www.gatsbyjs.com/docs/debugging-html-builds/).

Good luck! 🚀🚀🚀
