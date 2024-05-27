import type { SnarkArtifacts } from './types'
import { getSnarkArtifactUrls } from './urls'

// TODO: retry for browser?
// beisdes, is caching already handled by circom/snarkjs?
export default async function maybeGetSnarkArtifacts(
  ...pars: Parameters<typeof getSnarkArtifactUrls>
): Promise<SnarkArtifacts> {
  const { wasms, zkeys } = await getSnarkArtifactUrls(...pars)

  return {
    wasm: wasms[0],
    zkey: zkeys[0],
  }
}
