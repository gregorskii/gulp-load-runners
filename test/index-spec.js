import gulp from 'gulp';
import loader from '../lib/index';
import pluginConfig from './helpers/createConfig';

describe('index', () => {
  it('should export a function', () => {
    assert.typeOf(loader, 'function');
  });

  it('should accept gulp and options hash', () => {
    loader(gulp, pluginConfig);
  });
});
