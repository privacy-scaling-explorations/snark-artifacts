import { type Project, projects } from '../projects'
import type { SnarkArtifacts, Version } from './types'

export default async function maybeGetSnarkArtifacts(
  project: Project,
  options: {
    parameters?: (bigint | number | string)[]
    version?: Version
    cdnUrl?: string
  } = {},
): Promise<SnarkArtifacts> {
  if (!projects.includes(project)) {
    throw new Error(`Project '${project}' is not supported`)
  }

  options.version ??= 'latest'
  options.cdnUrl ??= 'https://unpkg.com'

  const BASE_URL = `${options.cdnUrl}/@zk-kit/${project}-artifacts@${options.version}`
  const parameters = options.parameters
    ? `-${options.parameters.join('-')}`
    : ''

  return {
    wasm: `${BASE_URL}/${project}${parameters}.wasm`,
    zkey: `${BASE_URL}/${project}${parameters}.zkey`,
  }
}
