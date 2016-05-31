## Gulp Load Runners

### Background

This plugin is created to help users organize and simplify the loading of what we term "runner tasks". These tasks are tasks that orchestrate the running of multiple processes to complete an end goal for a project.

An example of a runner tasks would be a task called "build" that is expected to run a few common tasks like `clean`, `sass`, `js` and place the output of these tasks into a folder called `dist`. Typically in `gulp` each of these tasks `clean`, `js`, `sass` are created in as single tasks and a composite task called `build` is created to run them together.

This plugin is similar in nature to the Grunt orchastrator [load-grunt-config](https://github.com/firstandthird/load-grunt-config) which does a bit more than load config.

In that project an `alias.yml` file is created to help developers more easily combine common tasks into composite tasks. Grunt also relied heavily on a single config. The plugin allows a developer to define a single task configuration file in `config` and it would automatically load that file merge its exports into the combined grunt config and register a task that could be run. It would allow for ad hoc tasks to be created by exporting a function, where it would provide the `grunt` instance to it.

Gulp is a bit more complicated as all tasks are ad hoc, they do not rely on a config to allow `gulp` to run them. This can get cumbersome in `gulp` projects because the implementee is required to manage any common config outside of the core of `gulp`.

`load-grunt-config` handled the complexity of managing config by providing the exports of the tasks config file to the task when it is run. This plugin does the same by allowing a `config` folder to be created which can house the specific config for each plugin defined by the user. With `gulp` however there can be a need to have a global config provided to each task as well. This global config would often hold the output path of all tasks, possible file matching globs, and top level source directories. This plugin allows for a user defined `projectConfig` to be passed through to the tasks as an argument.

### Project Goals

The primary goal of this project is to orchastrate organization of a `gulp` project but not force any specific paradigms to the user besides beyond the injection of plugins via `gulp-load-plugins` and the use of `gulp-sequence` (and it providing that to your tasks via the `plugins` param). 

It makes no assumptions about what is contained in your projects config, it puts the onus on you to make sure the config is valid when passed back to your task.

It makes no assumptions about how and what is being provided to the `projectConfig` argument, it simply provides it back to your tasks when being created.

It makes no assumptions about what version of `gulp` is being used, it is an argument to the constructor.

It does provide a default version of `gulp-sequence` and `gulp-load-plugins`, where `gulp-sequence` can be overriden by your `package.json`, but `gulp-load-plugins` cannot, as it is used internally to load the plugins on its own, and your package.json.

### Project Setup

A `gulp-load-runners` project would be setup similar to a project using [requireDir](https://github.com/aseemk/requireDir) where the gulp file sits at the root of a project, and a folder is created called `gulp`. This folder is a bit different because it is not just files that have exports. It has a few added directories/files:

* **tasks**: the tasks folder holds the ad-hoc tasks that would have existed in the `requireDir` base folder.
* **config**: config files that are loaded and passed to the tasks in the tasks folder. These configs do not need a 1-1 mapping with the tasks in the `tasks` folder. The configs are simply loaded, merged, and passed to each task upon initialization through its exported function if it has one.
* **aliases.yml**: the defintion of the runner tasks

A typical folder structure may look like this:

```
./gulp
├── aliases.yml
├── config
│   ├── browserSync.js
│   ├── clean.js
│   ├── copy.js
│   ├── eslint.js
│   ├── sass.js
│   ├── watch.js
│   └── webpack.js
├── gulp.config.js
├── gulp.env.js
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

And the aliases.yml:

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
export default (projectConfig) => {
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

Where `projectConfig` is provided by the config loader in `gulp-load-runners` and is comprised of the `projectConfig` provided at intiialization in the `gulpfile.js`.

A typical task would contain:

```
import { onError } from '../util/errorHandler';

export default (gulp, plugins, config) => {
  gulp.task('sass', () => {
    gulp.src(config.sass.paths)
      .pipe(plugins.gif(config.debugPaths, plugins.debug({title: 'FOUND (sass):'})))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass(config.sass.settings))
      .on('error', onError)
      .pipe(plugins.autoprefixer(config.sass.autoprefixer))
      .pipe(plugins.gif(process.env.debug, plugins.sourcemaps.write('.')))
      .pipe(plugins.gif(!process.env.debug, plugins.cleanCss(config.sass.clean)))
      .pipe(gulp.dest(`${config.dist}/${config.aemModule}/css`))
      .pipe(plugins.browserSync.stream({reload: true}));
  });
};

```

Where it was provided `gulp`, `plugins`, and `config` by `gulp-load-runners`. The errorHandler is a custom task provided to the module to handle error outputting and task errors through `gulp-util`. The next major update to this plugin will allow creation of this error handler once (defined by the user) and passed through to the task automatically.

The `gulpfile.js` contains:

```
import gulp from 'gulp';
import gulpLoadRunners from 'gulp-load-runners';
import projectConfig from './gulp/gulp.config';

gulpLoadRunners(gulp, {
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
  },
  projectConfig
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