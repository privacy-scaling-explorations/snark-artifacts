import { type Project } from '../projects'
import type { Version } from './types'

const BASE_URL = 'https://snark-artifacts.pse.dev'

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

export async function getBaseUrl(project: Project, version: Version): Promise<string> {
  await isVersionAvailableOrThrow(project, version)
  return `${BASE_URL}/${project}/${version}/${project}`
}
