import type { Project } from 'projects'
import type { Version } from './types'

const BASE_URL = 'https://snark-artifacts.pse.dev'

export const getBaseUrl = (project: Project, version: Version) => `${BASE_URL}/${project}/${version}/${project}`
