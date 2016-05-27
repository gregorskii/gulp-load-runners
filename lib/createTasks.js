const createRunnerTask = (name, tasks, gulp, plugins) => {
  gulp.task(name, plugins.sequence.apply(null, tasks));
};

export default (aliases, gulp, plugins) => {
  Object.keys(aliases).forEach((key) => {
    if (aliases.hasOwnProperty(key)) {
      createRunnerTask(key, aliases[key], gulp, plugins);
    }
  });
};
