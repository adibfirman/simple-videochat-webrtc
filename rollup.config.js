import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";

export default {
  plugins: [
    babel({ exclude: "node_modules/**" }),
    resolve({ browser: true, preferBuiltins: true }),
    commonjs(),
    builtins(),
    globals()
  ],
  watch: {
    exclude: "node_modules/**"
  },
  input: "src/main.js",
  output: {
    file: "./src/bundle.js",
    format: "iife",
    name: "bundle"
  }
};
