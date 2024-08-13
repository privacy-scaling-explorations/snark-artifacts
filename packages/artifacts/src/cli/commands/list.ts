import { Command } from '@commander-js/extra-typings'
import { exit } from 'node:process'
import { getAvailableVersions, projects } from '../../projects'
import { spinner } from '../spinner'

export const list = new Command('list')
  .alias('l')
  .description('List all projects and their available packages versions')
  .action(async () => {
    spinner.start()
    let output = ''
    for (const project of projects) {
      output += `${project}\n`
      try {
        const versions = await getAvailableVersions(project)
        for (const version of versions) output += `  ${version}\n`
      } catch (error) {
        spinner.fail(error.message)
        exit(1)
      }
    }
    spinner.succeed()
    console.log(output)
  })
