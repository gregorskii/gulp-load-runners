"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createRunnerTask = function createRunnerTask(name, tasks, gulp, plugins) {
  gulp.task(name, plugins.sequence.apply(null, tasks));
};

exports.default = function (aliases, gulp, plugins) {
  Object.keys(aliases).forEach(function (key) {
    if (aliases.hasOwnProperty(key)) {
      createRunnerTask(key, aliases[key], gulp, plugins);
    }
  });
};