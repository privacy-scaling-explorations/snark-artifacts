import { tmpdir } from 'node:os'
import { maybeDownload } from './download.ts'
import type { SnarkArtifacts } from './types'
import { getSnarkArtifactUrls } from './urls'

// https://unpkg.com/@zk-kit/poseidon-artifacts@latest/poseidon.wasm -> @zk/poseidon-artifacts@latest/poseidon.wasm
const extractEndPath = (url: string) => url.substring(url.indexOf('@zk'))

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
  ...pars: Parameters<typeof getSnarkArtifactUrls>
): Promise<SnarkArtifacts> {
  const { wasms, zkeys } = await getSnarkArtifactUrls(
    ...pars,
  )

  const outputPath = `${tmpdir()}/${extractEndPath(wasms[0])}`

  const [wasm, zkey] = await Promise.all([
    maybeDownload(wasms, outputPath),
    maybeDownload(zkeys, outputPath.replace(/.wasm$/, '.zkey')),
  ])

  return {
    wasm,
    zkey,
  }
}
