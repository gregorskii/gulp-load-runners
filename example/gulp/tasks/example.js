import gulp from 'gulp';

export default (gulp, plugins, config, errorHandler) => {
  console.log(errorHandler);
  gulp.task('example', () => {
    console.log(config.example.message);
  });
};
