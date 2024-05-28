import { maybeDownload } from './download.ts'
import type { SnarkArtifacts } from './types'
import { getSnarkArtifactUrls } from './urls'

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
  const [wasm, zkey] = await Promise.all([
    maybeDownload(wasms),
    maybeDownload(zkeys),
  ])

  return {
    wasm,
    zkey,
  }
}
