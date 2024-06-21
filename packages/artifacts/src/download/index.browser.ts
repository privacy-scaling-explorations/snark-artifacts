import { type Project, projects } from '../projects'
import type { SnarkArtifacts, Version } from './types'
import { getBaseUrl } from './urls'

export default async function maybeGetSnarkArtifacts(
  project: Project,
  options: {
    parameters?: (bigint | number | string)[]
    version?: Version
    cdnUrl?: string
  } = {},
): Promise<SnarkArtifacts> {
  if (!projects.includes(project))
    throw new Error(`Project '${project}' is not supported`)

  options.version ??= 'latest'
  const url = await getBaseUrl(project, options.version)
  const parameters = options.parameters
    ? `-${options.parameters.join('-')}`
    : ''

  return {
    wasm: `${url}${parameters}.wasm`,
    zkey: `${url}${parameters}.zkey`,
  }
}
