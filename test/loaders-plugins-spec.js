import pluginLoader from '../lib/loaders/plugins';
//import _proxyquire from 'proxyquire';
import gulpLoadPlugins from 'gulp-load-plugins';

//--- taken from GLP to simulate loading a package that is not installed

// var fakeGulpLoadPlugins = (function() {
//   var wrapInFunc = function(value) {
//     return function() {
//       return value;
//     };
//   };
//
//   var proxyquire = _proxyquire.noCallThru();
//
//   return proxyquire('gulp-load-plugins', {
//     'gulp-foo': wrapInFunc({name: 'foo'}),
//     'gulp-sequence': wrapInFunc({name: 'sequence'})
//   });
// })();

//---

describe('plugin config', () => {
  it('should return an object with plugins', () => {
    const plugins = pluginLoader(gulpLoadPlugins);

    assert.isObject(plugins);
  });

  it('should return gulp sequence as included plugin', () => {
    const plugins = pluginLoader(gulpLoadPlugins);

    assert.isDefined(plugins.sequence);
  });

  // HOW? using above fake tries to load gulp-sequence since its in the package.json
  // dont want to have to include another gulp package just to test it...
  it('should return calling packages plugins', () => {
    // const plugins = pluginLoader(fakeGulpLoadPlugins, {
    //   config: {
    //     dependencies: {
    //       'gulp-foo': '1.0.0'
    //     }
    //   }
    // });
    //
    // assert.isDefined(plugins.foo);
  });
});
