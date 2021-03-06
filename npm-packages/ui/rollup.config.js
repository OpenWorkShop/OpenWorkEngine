import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-only';

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
    resolve({
      preferBuiltins: true,
    }),
    css({ output: './dist/bundle.css' }),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: '**/__tests__/**',
      clean: true,
    }),
    commonjs({
      include: ['./node_modules/**'],
    }),
  ],
  external: [
    'react',
    'react-is',
    'react-dom',
    'prop-types',
    '@material-ui',
    'redux-oidc',
    'oidc-client',
    'js-logger',
    '@apollo',
    'hoist-non-react-statics',
    'fast-json-stable-stringify',
    'zen-observable',
    'graphql-tag',
    'events',
    'url',
    'http',
    'https',
    'stream',
    'zlib',
  ],
};
