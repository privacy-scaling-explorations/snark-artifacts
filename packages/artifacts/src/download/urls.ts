import { type Project, projects } from '../projects'
import type { ArrayOf, Version } from './types'

export type Urls = ArrayOf<string, 3>

export async function getAvailableVersions(project: Project) {
  const res = await fetch(`https://registry.npmjs.org/@zk-kit/${project}-artifacts`)
  const { versions } = await res.json()
  return Object.keys(versions)
}

async function isVersionAvailableOrThrow(project: Project, version: Version) {
  const availableVersions = await getAvailableVersions(project)
  if (version !== 'latest' && !availableVersions.includes(version))
    throw new Error(`Version '${version}' is not available for project '${project}'`)
}

export async function getBaseUrls(project: Project, version: Version): Promise<Urls> {
  await isVersionAvailableOrThrow(project, version)
  return [
    `https://unpkg.com/@zk-kit/${project}-artifacts@${version}/${project}`,
    `https://raw.githubusercontent.com/privacy-scaling-explorations/snark-artifacts/@zk-kit/${project}-artifacts@${version}/packages/${project}/${project}`,
    `https://cdn.jsdelivr.net/npm/@zk-kit/${project}-artifacts@${version}/${project}`,
  ]
}

export async function getSnarkArtifactUrls(
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
  const urls = await getBaseUrls(project, options.version)

  const parameters = options.parameters
    ? `-${options.parameters.join('-')}`
    : ''

  return {
    wasms: urls.map((url) => `${url}${parameters}.wasm`) as unknown as Urls,
    zkeys: urls.map(url => `${url}${parameters}.zkey`) as unknown as Urls,
  }
}
