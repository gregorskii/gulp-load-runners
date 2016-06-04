/* eslint "no-process-exit": 0, "object-shorthand": 0, "func-names": 0 */

const notifier = require('node-notifier');
const path = require('path');
const cwd = process.cwd();
const ERROR_LEVELS = ['fatal', 'error', 'warning'];
const EXIT_LEVEL = process.env.fatal || 'error';

module.exports = (plugins) => {
  function shouldExit(level) {
    return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(EXIT_LEVEL);
  }

  function handleError(level, error) {
    plugins.util.log(plugins.util.colors.red(error.message));

    notifier.notify({
      title: 'Gulp Error',
      message: error.message,
      icon: path.join(cwd, 'gulp', 'util', 'gulp.png')
    });

    if (shouldExit(level)) {
      plugins.util.log(plugins.util.colors.red('<<< Exiting'));
      process.exit(1);
    } else {
      plugins.util.log(plugins.util.colors.red('<<< Emitting end, continuing'));
      /* eslint no-invalid-this: 0 */
      this.emit('end');
    }
  }

  return {
    onError: function(error) {
      handleError.call(this, 'error', error);
    },
    onWarning: function(warning) {
      handleError.call(this, 'warning', warning);
    },
    throwPluginError: function(pluginName, error) {
      const err = new plugins.util.PluginError({
        plugin: pluginName,
        message: error
      });

      handleError.call(this, 'error', err);
    }
  };
};
