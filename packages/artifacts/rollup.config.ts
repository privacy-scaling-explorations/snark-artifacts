import fs from 'node:fs'
import alias from '@rollup/plugin-alias'
import typescript from '@rollup/plugin-typescript'
import type { RollupOptions } from 'rollup'

const input = 'src/index.ts'
const plugins = [
  typescript({
    tsconfig: './tsconfig.build.json',
  }),
]
const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
const banner = `/**
 * @module ${pkg.name}
 * @version ${pkg.version}
 * @file ${pkg.description}
 * @copyright Ethereum Foundation ${new Date().getFullYear()}
 * @license ${pkg.license}
 * @see [Github]{@link ${pkg.homepage}}
*/`

const config: RollupOptions[] = [
  {
    input,
    output: [
      {
        file: pkg.exports['.'].node.require,
        format: 'cjs',
        banner,
        exports: 'auto',
      },
      { file: pkg.exports['.'].node.import, format: 'es', banner },
    ],
    external: ['node:fs', 'node:fs/promises', 'node:os', 'node:path'],
    plugins,
  },
  {
    input,
    output: [{ file: pkg.exports['.'].browser, format: 'es', banner }],
    external: ['node:fs', 'node:fs/promises', 'node:os', 'node:path'],
    plugins: [
      ...plugins,
      alias({
        entries: [
          {
            find: './download/download.node',
            replacement: './download/download.browser',
          },
        ],
      }),
    ],
  },
]

export default config
