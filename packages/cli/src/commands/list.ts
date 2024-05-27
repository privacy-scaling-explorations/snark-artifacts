import { Command } from '@commander-js/extra-typings'
import { getAvailableVersions, projects } from '@zk-kit/artifacts'
import { withSpinner } from '../spinner'

export const list = new Command('list').alias('l').description(
  'List all projects and their available packages versions',
).action(withSpinner(
  async () => {
    let output = ''
    for (const project of projects) {
      output += `${project}\n`
      const versions = await getAvailableVersions(project)
      for (const version of versions)
        output += `  ${version}\n`
    }
    return output
  },
))
