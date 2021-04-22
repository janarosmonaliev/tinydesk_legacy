# Getting Started

We are using [GatsbyJS](https://www.gatsbyjs.com/docs/how-to/) as a core front-end framework and [Material UI](https://material-ui.com/getting-started/installation/) as a helper design tool. Clone our repository, install dependencies and start a development server:

```bash
git clone https://github.com/janarosmonaliev/project-416.git
npm install && npm start
```

## Development

### React

Since GatsbyJS utilizes React, please familiarize yourself with [React Hooks](https://reactjs.org/docs/hooks-reference.html). It is an easier way to manage state and refs within components.

### Folder Structure

- `src/components` - React components
- `src/pages` - pages that will be generated
- `src/style.sccs` - global styling with Sass
- `gatsby-config.js` - plugins configuration and site metadata

### Gatsby

Please note that **production build** sometimes might not behave or look as the same as **development build**. Inconsistencies usually arise during HTML builds. Gatsby has a [guideline on debugging these issues](https://www.gatsbyjs.com/docs/debugging-html-builds/).

## Commit messages

Please use an imperatative mood in your commit messages. It is a verb form that makes a command or an instruction. Don't write "React component changed". Write "Change React component".

A proper commit message should complete the following sentence:  
_- If applied, this commit will_ `your message`  
_- If applied, this commit will **Change React component**_  
_- If applied, this commit will **~~React component changed~~**_

## Pull requests and merging

1. Before making a pull request, please make a production build of your code. Script below will run `gatsby clean`, `gatsby build` and `gatsby serve`. It cleans build files and cache, makes a production build and serves it on `localhost:9000`.

```
npm run build-test
```

2. Push your changes and make a pull request. Carefully review the code and wait until `build-test` Github Action finishes checking your code. If there are conflicts, resolve them in your branch by following the steps below:

```bash
(master) git pull origin master  # pulls latest changes from remote
(master) git checkout new-feature  # your branch with conflicts

(new-feature) git pull origin new-feature  # pulls latest changes from remote
(new-feature) git merge master  # merge master into your branch
```

After that, git will prompt you to resolve conflicts by accepting or rejecting changes. Once done, commit merged code and push your changes to the remote.

```bash
(new-feature) git push origin new-feature
```

3. Once conflicts are resolved and code is checked, merge your branch with master. If you encounter some unexpected behavior, or the master branch fails on build - revert your changes:

```bash
(master) git revert --no-commit <commit_hash_oldest> <commit_hash_latest>
(master) git add .
(master) git commit -m "Revert changes"
(master) git push origin master
```

## Latest version

Latest stable production build of the application is automatically published to `gh-pages` branch. It is served at [https://janarosmonaliev.github.io/project-416/](https://janarosmonaliev.github.io/project-416/)

## Issues

Active issues can be found in [Issues tab](https://github.com/janarosmonaliev/project-416/issues). If you believe that an issue or a bug might interfere with other people's development process, please create a new issue. It must have a short title and a description of the issue. It would be useful to set a flair (`react-bug`, `gatsby-bug`, etc.), include an image and how and where the error can be reproduced.

## Change Log

[@janarosmonaliev](https://github.com/janarosmonaliev) will document important changes to the project on a weekly basis to [CHANGELOG.md](CHANGELOG.md). If there is no substantial progress made on a particular week, change log will be omitted.

**Format:**

## [version] - yyyy-mm-dd

Important notes from KGB team.

### Added

- Add Gatsby starter to the repo

### Changed

- Change site metadata

### Fixed

- Fix gatsby-build-test Github action

Good luck! 🚀🚀🚀
