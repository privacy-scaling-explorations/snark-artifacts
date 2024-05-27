import { type Project, projects } from '../projects'
import type { ArrayOf, Version } from './types'

export type Urls = ArrayOf<string, 3>

export const getBaseUrls = (project: Project, version: Version): Urls => [
  `https://unpkg.com/@zk-kit/${project}-artifacts@${version}/${project}`,
  `https://raw.githubusercontent.com/privacy-scaling-explorations/snark-artifacts/@zk-kit/${project}-artifacts@${version}/packages/${project}/${project}`,
  `https://cdn.jsdelivr.net/npm/@zk-kit/${project}-artifacts@${version}/${project}`,
]

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
  const urls = getBaseUrls(project, options.version)

  const parameters = options.parameters
    ? `-${options.parameters.join('-')}`
    : ''

  return {
    wasms: urls.map((url) => `${url}${parameters}.wasm`) as unknown as Urls,
    zkeys: urls.map(url => `${url}${parameters}.zkey`) as unknown as Urls,
  }
}
