import { type Project, projects } from '../projects'
import { getCdnUrls, type Urls } from './cdns'
import type { SnarkArtifacts, Version } from './types'

export function getSnarkArtifactUrls(
  project: Project,
  options: {
    parameters?: (bigint | number | string)[]
    version?: Version
    cdnUrl?: string
  } = {},
) {
  if (!projects.includes(project))
    throw new Error(`Project '${project}' is not supported`)

  options.version ??= 'latest'
  const urls = getCdnUrls(project, options.version)

  const parameters = options.parameters
    ? `-${options.parameters.join('-')}`
    : ''

  return {
    wasms: urls.map((url) => `${url}${parameters}.wasm`) as unknown as Urls,
    zkeys: urls.map(url => `${url}${parameters}.zkey`) as unknown as Urls,
  }
}

export default async function maybeGetSnarkArtifacts(
  ...pars: Parameters<typeof getSnarkArtifactUrls>
): Promise<SnarkArtifacts> {
  const { wasms, zkeys } = getSnarkArtifactUrls(...pars)

  return {
    wasm: wasms[0],
    zkey: zkeys[0],
  }
}
