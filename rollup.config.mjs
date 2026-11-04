import babelPlugin from '@rollup/plugin-babel';
import commonjsPlugin from '@rollup/plugin-commonjs';
import jsonPlugin from '@rollup/plugin-json';
import resolvePlugin from '@rollup/plugin-node-resolve';
import replacePlugin from '@rollup/plugin-replace';
import { isAbsolute, relative, resolve } from 'path';
import { readPackageUp } from 'read-package-up';
import { defineConfig } from 'rollup';
import postcssPlugin from 'rollup-plugin-postcss';
import userscript from 'rollup-plugin-userscript';
import sveltePlugin from 'rollup-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';

const { packageJson } = await readPackageUp();
const extensions = ['.ts', '.tsx', '.mjs', '.js', '.jsx', '.svelte'];

export default defineConfig(
  Object.entries({
    'ruleUltra': 'src/main.ts',
  }).map(([name, entry]) => ({
    input: entry,
    plugins: [
      sveltePlugin({
        preprocess: sveltePreprocess(),
        emitCss: false,
      }),
      postcssPlugin({
        inject: false,
        minimize: true,
      }),
      babelPlugin({
        // import helpers from '@babel/runtime'
        babelHelpers: 'runtime',
        plugins: [
          [
            import.meta.resolve('@babel/plugin-transform-runtime'),
            {
              useESModules: true,
              version: '^7.5.0', // see https://github.com/babel/babel/issues/10261#issuecomment-514687857
            },
          ],
        ],
        exclude: 'node_modules/**',
        extensions,
      }),

      replacePlugin({
        values: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
        preventAssignment: true,
      }),
      resolvePlugin({
        browser: true,
        extensions,
        exportConditions: ['svelte', 'browser'],
      }),
      commonjsPlugin(),
      jsonPlugin(),
      userscript((meta) =>
        meta.replace('process.env.AUTHOR', packageJson.author.name),
      ),
    ],
    external: defineExternal([]),
    output: {
      format: 'iife',
      file: `dist/${name}.user.js`,
      indent: false,
      banner: `// ==UserScript==
// @name        Rule ULTRA
// @namespace   RuleUltra
// @description A Rule34 super script
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @version     0.0.0
// @author      DommySalami
// @match       https://rule34.xxx/*
// @downloadURL https://github.com/DommyLovesSalami/ruleULTRA/raw/refs/heads/master/dist/ruleUltra.user.js
// @updateURL   https://github.com/DommyLovesSalami/ruleULTRA/raw/refs/heads/master/dist/ruleUltra.user.js
// ==/UserScript==
`
    },
  })),
);

function defineExternal(externals) {
  return (id) =>
    externals.some((pattern) => {
      if (typeof pattern === 'function') return pattern(id);
      if (pattern && typeof pattern.test === 'function')
        return pattern.test(id);
      if (isAbsolute(pattern))
        return !relative(pattern, resolve(id)).startsWith('..');
      return id === pattern || id.startsWith(pattern + '/');
    });
}
