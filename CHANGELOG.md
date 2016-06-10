# Change Log
Change log for `gulp-load-runners`.

## [0.2.1] - 2016-09-06
### Added
- adding missing js-yaml dep

## [0.2.1] - 2016-04-06
### Updates
- Readme updates for 0.2.0
- Fixed issue with export and exports (es6 versus es5) use on project gulp files

## [0.2.0] - 2016-04-06
### Breaking Changes
- Renamed aliases.yml to runners.yml in codebase, update 'aliasFile' option as 'runnerFile' in options hash to fix

### Added
- Travis integration and build status on GH readme

### Updates
- Dropped using ES6 export/import from calling codes gulpfile, only use of requiring gulpfile.babel.js (babel require) was to support import/export, library /dist is always compiled by babel, no need to enforce (or suggest) calling projects use import/export in the gulpfile

### Fixes
- Fixing wallabyjs config
- Added node-notifier to dev deps so example folder will work with error checking

## [0.1.2] - 2016-31-05
### Added
- Added example of errorHandler use

## [0.1.1] - 2016-31-05
### Added
- Pass-through of errorHandler object to tasks

## [0.1.1] - 2016-31-05
### Added
- Readme Updates

## [0.1.0] - 2016-31-05
### Added
- Initial NPM release
