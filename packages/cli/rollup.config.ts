import typescript from '@rollup/plugin-typescript'
import { readFileSync } from 'node:fs'
import type { RollupOptions } from 'rollup'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))
const banner = `#!/usr/bin/env node

/**
 * @module ${pkg.name}
 * @version ${pkg.version}
 * @file ${pkg.description}
 * @copyright Ethereum Foundation ${new Date().getFullYear()}
 * @license ${pkg.license}
 * @see [Github]{@link ${pkg.homepage}}
*/
`
const config: RollupOptions = {
  input: 'src/index.ts',
  output: {
    file: pkg.bin.snarkli,
    format: 'es',
    banner,
  },
  plugins: [
    typescript({ tsconfig: './tsconfig.build.json' }),
  ],
  external: [...Object.keys(pkg.dependencies), 'node:console', 'node:fs', 'node:os', 'node:path', 'node:process'],
}

export default config
