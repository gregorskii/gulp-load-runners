const createRunnerTask = (name, tasks, gulp, plugins) => {
  gulp.task(name, plugins.sequence.apply(null, tasks));
};

export default (aliases, gulp, plugins) => {
  for (const [key, value] of aliases.entries()) {
    createRunnerTask(key, value, gulp, plugins);
  }
};
