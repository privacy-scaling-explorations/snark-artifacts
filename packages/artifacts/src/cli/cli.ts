import { Command } from '@commander-js/extra-typings'
import { error } from 'node:console'
import { exit } from 'node:process'
import COMMANDS from './commands/index'

export class Cli {
  cli: Command

  constructor() {
    this.cli = new Command()
    this.build()
  }

  build() {
    for (const command of COMMANDS) this.cli.addCommand(command)
  }

  async run(args: string[]) {
    await this.cli.parseAsync(args)
  }
}

export const run = async () =>
  new Cli().run(process.argv).catch((err) => {
    error(err)
    exit(1)
  })
