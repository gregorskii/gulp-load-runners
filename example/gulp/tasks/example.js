module.exports = (gulp, plugins, config, errorHandler) => {
  gulp.task('example', () => {
    console.log(config.example.message);
  });
};
