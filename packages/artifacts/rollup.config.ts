import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import fs from "fs";

const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const banner = `/**
 * @module ${pkg.name}
 * @version ${pkg.version}
 * @file ${pkg.description}
 * @copyright Ethereum Foundation ${new Date().getFullYear()}
 * @license ${pkg.license}
 * @see [Github]{@link ${pkg.homepage}}
*/`;

export default {
  input: "src/index.ts",
  output: [
    { file: pkg.main, format: "cjs", banner, exports: "auto" },
    { file: pkg.module, format: "es", banner },
  ],
  plugins: [typescript({ tsconfig: "./tsconfig.build.json" }), terser()],
};
