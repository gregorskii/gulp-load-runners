const createRunnerTask = (gulp, plugins, name, tasks) => {
  gulp.task(name, plugins.sequence.apply(null, tasks));
};

export const createRunnerTasks = (gulp, aliases) => {
  for (const [key, value] of aliases.entries()) {
    createRunnerTask(gulp, key, value);
  }
};
