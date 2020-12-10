import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import graphql from '@rollup/plugin-graphql';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: './dist/index.ts',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: './dist/index.es.js',
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    graphql(),
    resolve({
      preferBuiltins: true,
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: '**/__tests__/**',
      clean: true,
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
  ],
  external: [
    'fast-json-stable-stringify', 'react', 'js-logger', 'react-dom', 'prop-types', 'redux-oidc', 'oidc-client',
    'events', 'url', 'http', 'https', 'stream', 'zlib', 'zen-observable', 'graphql-tag', 'lodash'
  ],
};
