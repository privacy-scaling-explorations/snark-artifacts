import { Command } from '@commander-js/extra-typings'
import { getAvailableVersions, projects } from '@zk-kit/artifacts'

export const list = new Command('list').alias('l').description('List all projects and their available packages versions').action(
  async () => {
    let output = ''
    for (const project of projects) {
      output += `${project}\n`
      const versions = await getAvailableVersions(project)
      for (const version of versions)
        output += `  ${version}\n`
    }

    console.log(output)
  },
)
