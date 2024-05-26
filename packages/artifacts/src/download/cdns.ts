import type { Project } from '../projects'
import type { Strings, Version } from './types'

const CDNS = ['https://unpkg.com', 'https://raw.githubusercontent.com', 'https://cdn.jsdelivr.net'] as const

export type Urls = Strings<typeof CDNS>

export const getCdnUrls = (project: Project, version: Version): Urls => [
  `${CDNS[0]}/@zk-kit/${project}-artifacts@${version}/${project}`,
  `${CDNS[1]}/privacy-scaling-explorations/@zk-kit/${project}-artifacts@${version}/packages/${project}/${project}`,
  `${CDNS[2]}/@zk-kit/${project}-artifacts@${version}/${project}`,
]
