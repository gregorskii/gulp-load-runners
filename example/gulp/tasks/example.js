import gulp from 'gulp';

export default (gulp, plugins, config) => {
  gulp.task('example', () => {
    console.log(config.example.message);
  });
};
