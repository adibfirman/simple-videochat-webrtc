import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import json from "@rollup/plugin-json";

export default {
  plugins: [
    babel({ exclude: "node_modules/**", runtimeHelpers: true }),
    resolve({ browser: true, preferBuiltins: true }),
    commonjs(),
    builtins(),
    globals(),
    json()
  ],
  watch: {
    exclude: "node_modules/**"
  },
  input: "src/main.js",
  output: {
    file: "./src/bundle.js",
    format: "iife",
    globals: {
      "socket.io-client": "io"
    }
  }
};
