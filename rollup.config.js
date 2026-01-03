import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from "@rollup/plugin-terser";

const external = ["react", "react-dom"];

const terserOptions = {
  compress: {
    passes: 2,
    drop_console: true,
    drop_debugger: true,
  },
  mangle: {
    properties: {
      regex: /^_/ // _로 시작하는 내부 필드만 난독화
    }
  },
  format: {
    comments: false,
  },
  keep_classnames: false,
  keep_fnames: false,
};

export default [
  // JS 번들
  {
    input: "src/index.ts",
    external,
    output: [
      {
        file: "dist/react-history-transaction.es.js",
        format: "es",
        sourcemap: true,
        plugins: [terser(terserOptions)]
      },
      {
        file: "dist/react-history-transaction.cjs.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
        plugins: [terser(terserOptions)]
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false
      })
    ]
  },

  // 타입 번들
  {
    input: "src/index.ts",
    external,
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()]
  }
]