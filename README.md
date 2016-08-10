## Gulp Load Runners

[![Build Status](https://travis-ci.org/gregorskii/gulp-load-runners.svg?branch=master)](https://travis-ci.org/gregorskii/gulp-load-runners)

[![NPM](https://nodei.co/npm/gulp-load-runners.png)](https://nodei.co/npm/gulp-load-runners)

## Install

```
npm install gulp-load-runners --save-dev
```

### Background

This plugin was created to help users organize and simplify the loading "runner tasks" in Gulp. These tasks are tasks that orchestrate the running of multiple processes to complete a larger process through the use of `gulp-sequence`.

This plugin is similar in nature to the Grunt orchestrator [load-grunt-config](https://github.com/firstandthird/load-grunt-config) which allows users to specify a config for each Grunt Task, and organize those tasks into "aliases".

This plugin uses `gulp-load-plugins` under the hood to load the calling projects `package.json` to automatically load plugins. It merges the calling projects plugins with its own plugins and provides them to each task.


Gulp is a bit more complicated than `Grunt` as all tasks are ad-hoc, and they do not rely on a config to allow `gulp` to run them. This can get cumbersome in a `gulp` project because the implementer is required to manage any common config outside of the core API of `gulp`.

This plugin provides a place to put project, and task based config. Task based config can be stored in single files under the folder `gulp/config`.
A project config can be merged into the task configs by providing a path to a JS file that exports a POJO. The global config can hold anything you want, most commonly used in our projects are; src/dist folders, file matching globs, and task source directories.

This plugin also provides a common place to put tasks, and automatically loads them into Gulp and provides them the `Gulp` object, the project and task configs, the projects `Gulp` plugins, and an optional `errorHandling` function.

### Project Goals

The primary goal of this project is to orchestrate organization of a `gulp` project but not force any specific paradigms to the user beyond the injection of plugins via `gulp-load-plugins` and the use of `gulp-sequence` (and it providing that to your tasks via the `plugins` param).

It makes no assumptions about:

* what is contained in your projects config, it puts the onus on you to make sure the config is valid when passed back to your task
* how and what is being provided to the `projectConfig` argument, it simply provides it back to your tasks when being created
* what version of `gulp` is being used, it is an argument to the constructor

It does provide a default version of `gulp-sequence` and `gulp-load-plugins`, where `gulp-sequence` can be overridden over by your `package.json`, but `gulp-load-plugins` cannot, as it is used internally to load the plugins on its own, and your `package.json`.

### Project Setup

A `gulp-load-runners` project would be setup similar to a project using [requireDir](https://github.com/aseemk/requireDir) where the gulp file sits at the root of a project, and a folder is created called `gulp`. This folder is a bit different because it is not just files that have tasks as exports. It has a few added directories/files:

* **tasks**: the tasks folder holds the ad-hoc tasks that would have existed in the `requireDir` base folder
* **config**: config files that are loaded and passed to the tasks in the tasks folder. These configs do not need a 1-1 mapping with the tasks in the `tasks` folder. The configs are simply loaded, merged, and passed to each task upon initialization through its exported function if it has one
* **runners.yml**: the definition of the runner tasks

A typical folder structure may look like this:

```
./gulp
├── runners.yml
├── config
│   ├── browserSync.js
│   ├── clean.js
│   ├── copy.js
│   ├── eslint.js
│   ├── sass.js
│   ├── watch.js
│   └── webpack.js
├── gulp.config.js
├── tasks
│   ├── clean.js
│   ├── copy.js
│   ├── eslint.js
│   ├── karma.js
│   ├── sass.js
│   ├── watch.js
│   └── webpack.js
└
```

And the runners.yml file would contain:

```
default:
  - 'bundle'

bundle:
  - 'clean'
  - ['copy:images', 'copy:fonts', 'copy:views', 'sass', 'webpack']

build:
  - 'bundle'

```

A typical config file would contain:

```
module.exports = (projectConfig) => {
  return {
    paths: [
      `${projectConfig.src}/global-styles/**/${projectConfig.extensionGlobs.sass}`
    ],
    settings: {
      outputStyle: 'compressed',
      precision: 10
    },
    autoprefixer: {
      browsers: ['last 2 versions'],
      cascade: false
    },
    clean: {
      keepSpecialComments: 0
    }
  };
};

```

Where `projectConfig` is provided by the config loader in `gulp-load-runners` and is comprised of the `projectConfig` provided at initialization in the `gulpfile.js`.

A typical task would contain:

```
module.exports = (gulp, plugins, config, errorHandler) => {
  gulp.task('sass', () => {
    gulp.src(config.sass.paths)
      .pipe(plugins.gif(config.debugPaths, plugins.debug({title: 'FOUND (sass):'})))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass(config.sass.settings))
      .pipe(plugins.autoprefixer(config.sass.autoprefixer))
      .pipe(plugins.gif(process.env.debug, plugins.sourcemaps.write('.')))
      .pipe(plugins.gif(!process.env.debug, plugins.cleanCss(config.sass.clean)))
      .pipe(gulp.dest(`${config.dist}/${config.aemModule}/css`))
      .pipe(plugins.browserSync.stream({reload: true}));
  });
};
```

Where it was provided `gulp`, `plugins`, `config`, and `errorHandler` by `gulp-load-runners`.

The `gulpfile.js` contains:

```
const gulp = require('gulp');
const gulpLoadRunners = require('gulp-load-runners');
const projectConfig = require('./gulp/gulp.config');

gulpLoadRunners(gulp, {
  projectConfig,
  gulpLoadPluginsConfig: {
    DEBUG: false,
    camelize: true,
    lazy: true, // Add any other plugins that are not 'gulp-' but desired
    // to be loaded in the plugins object
    pattern: [
      'gulp-*', 'gulp.*', 'del', 'browser-sync', 'vinyl-*', 'webpack-stream'
    ],
    rename: {
      'gulp-if': 'gif'
    }
  }
});

```

Where `projectConfig` in this case contains:

```
import path from 'path';
const cwd = process.cwd();

const basePath = cwd;
const src = path.join(cwd, 'src');
const dist = path.join(cwd, 'dist');
const bowerRoot = path.join(cwd, 'bower_components');
const nodeRoot = path.join(cwd, 'node_modules');

const extensionGlobs = {
  fonts: '*.{ttf,woff,eof,svg,woff2,eot}',
  images: '*.{jpg,png,gif,svg}',
  videos: '*.{mp4,mov,ogv,webm}',
  sass: '*.{scss,sass}',
  js: '*.{js,jsx}',
  css: '*.{css}',
  svg: '*.svg',
  views: '*.html',
  map: '*.map'
};

module.exports = {
  src,
  dist,
  basePath,
  bowerRoot,
  nodeRoot,
  extensionGlobs,
  debugPaths: false
};

```

You can see a working example of the project at this repos [example directory](https://github.com/gregorskii/gulp-load-runners/tree/master/example).

### Runners

The runners file allows one to easily define the runner tasks. The file is setup as YML arrays where the async/sync nature of `gulp-sequence` is preserved in the YML configuration.

For instance in this example:

```
default:
  - 'bundle'

bundle:
  - 'clean'
  - ['copy:images', 'copy:fonts', 'copy:views', 'sass', 'webpack']

build:
  - 'bundle'

```

The bundle task will run clean first, then the array group of other tasks.

In the example configuration above the difference between the `default` task and `build` would be defined by an environment setting. Where `build` would build
for production, and `default` would build for local, ignoring things like browserSync which are run using `watch`. As this is all a personal preference this plugin makes no assumptions about how you setup your environment configuration or tasks, this is an example of the workflow I use on projects.

#### Parallel and Series Tasks

Given:

```
test:
  - 'test1'
  - 'test2'
  - 'test3'
  - 'test4'
  - 'test5'
  - 'test6'

test2:
  - ['test1', 'test2', 'test3', 'test4']

test3:
  -
    - 'test1'
    - 'test2'
    - 'test3'
    - 'test4'

```

The task list is provided to the plugin as an array and gulp-sequence .apply() is used. To get parallel tasks you must setup an array to be applied to
sequence. Note that for long task names a nested YML array is better. See that example "test2" and example "test3" are the same. The tasks 1-4 will be run in parallel.

### Tasks

Tasks are placed in files in `tasks` and contain:

```
module.exports = (gulp, plugins, config, errorHandler) => {
  gulp.task('example', () => {
    console.log('Hello!');
  });
};
```

The tasks are automatically provided `gulp`, `plugins`, `config`, and `errorHandler` by this plugin.

### Config

Config files are placed in the `config` folder and are a module with either a POJO, or function export:

```
module.export =  {
  message: 'Hello World!'
};
```

```
module.export = (projectConfig) => {
  message: 'Hello World!'
};
```

Where in the functional example `projectConfig` is provided to the configuration file upon processing.

### Error Handling

The plugin can also be used to pass through an error handler object to tasks. In my use case the errorHandler relies on gulp-util which is loaded by the `gulp-load-plugins` package.

In this use case we can pass a object to `gulp-load-runners` that is called with the plugins object from `gulp-load-plugins`.

In the example [errorHandler](https://github.com/gregorskii/gulp-load-runners/blob/master/example/gulp/util/errorHandler.js) we are relying on `node-notifier` and a custom exit level to determine if the task should stop, or continue on error. We provide the task a known errorHandler object with `onError`, `onWarning`, and `throwPluginError` functions. Since the goal of the error handler is beyond the scope of this plugin `gulp-load-runners` simply checks if the errorHandler being passed to it is a function, if it is it will call it with the loaded plugins and config.

In this case any error handler is expected to return the error handler object or object literal of functions.

Meaning it must be comprised of this pattern:

```
module.exports = (plugins, config) => {
  // DO SOMETHING
  return THE_HANDLER;
};
```

As the thing returned to the tasks will be "THE_HANDLER". This plugin makes no assumptions on what "THE_HANDLER" does. It does however force the use of a default export so it knows whether you need the plugins and the config when initializing the handler.

### Contributing

Contributions are welcome as PR's. Please discuss any improvements and shortcomings to the plugin in the issues section. I have tried to make it as a transparent to a users process as possible, but discussions on improvement and assumptions made by the plugin are welcome.

To develop for this plugin please check out the repo, install the deps, and then use the npm config tasks:

* build - will run eslint, unit tests, create jsdocs, and compile the lib folder into dist via Babel
* test - will run the unit tests
* docs - will build the jsdocs
* clean - will delete `dist` using `del-cli`
* eslint - will run eslint
* babel - will compile with Babel

Example:

```
npm run build
```

Quick shortcut for build and commit:

```
npm run build && git add . && git commit -m "MESSAGE" && git push origin master
```

### Contributors

* Greg Parsons (https://github.com/gregorskii)
* Mike Dyer (https://github.com/listenrightmeow)

### License

[MIT](https://opensource.org/licenses/MIT)
