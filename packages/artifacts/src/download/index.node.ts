import { tmpdir } from 'node:os'
import { maybeDownload } from './download'
import _maybeGetSnarkArtifacts from './index.browser'
import type { SnarkArtifacts } from './types'

const extractEndPath = (url: string) => url.split('pse.dev/')[1]

/**
 * Downloads SNARK artifacts (`wasm` and `zkey`) files if not already present in OS tmp folder.
 * @example
 * ```ts
 * {
 *   wasm: "/tmp/@zk-kit/semaphore-artifacts@latest/semaphore-3.wasm",
 *   zkey: "/tmp/@zk-kit/semaphore-artifacts@latest/semaphore-3.zkey" .
 * }
 * ```
 * @returns {@link SnarkArtifacts}
 */
export default async function maybeGetSnarkArtifacts(
  ...pars: Parameters<typeof _maybeGetSnarkArtifacts>
): Promise<SnarkArtifacts> {
  const urls = await _maybeGetSnarkArtifacts(...pars)

  const outputPath = `${tmpdir()}/snark-artifacts/${extractEndPath(urls.wasm)}`

  const [wasm, zkey] = await Promise.all([
    maybeDownload(urls.wasm, outputPath),
    maybeDownload(urls.zkey, outputPath.replace(/.wasm$/, '.zkey')),
  ])

  return {
    wasm,
    zkey,
  }
}
