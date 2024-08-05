import typescript from '@rollup/plugin-typescript'
import fs from 'node:fs'
import type { RollupOptions } from 'rollup'

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
const bannerCli = `#!/usr/bin/env node

/**
 * @module ${pkg.name}
 * @version ${pkg.version}
 * @file ${pkg.description}
 * @copyright Ethereum Foundation ${new Date().getFullYear()}
 * @license ${pkg.license}
 * @see [Github]{@link ${pkg.homepage}}
*/
`

const config: RollupOptions[] = [
  {
    input: 'src/index.node.ts',
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
    input: 'src/index.browser.ts',
    output: [{ file: pkg.exports['.'].browser, format: 'es', banner }],
    plugins,
  },
  {
    input: 'src/cli/index.ts',
    output: { file: pkg.bin.snarkli, format: 'es', banner: bannerCli },
    plugins,
    external: [
      ...Object.keys(pkg.dependencies),
      'node:console',
      'node:fs',
      'node:os',
      'node:path',
      'node:process',
      'node:stream',
    ],
  },
]

export default config
