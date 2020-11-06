import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main.toString().replace("./", "./dist/"),
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
    {
      file: pkg.module.toString().replace("./", "./dist/"),
      format: "es",
      exports: "named",
      sourcemap: true,
    },
  ],
  plugins: [
    external(),
    resolve({
      preferBuiltins: true,
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: "**/__tests__/**",
      clean: true,
    }),
    commonjs({
      include: ["node_modules/**"],
    }),
  ],
  external: [
    'react', 'react-dom', 'prop-types',
    'events', 'url', 'http', 'https', 'stream', 'zlib'
  ],
};
