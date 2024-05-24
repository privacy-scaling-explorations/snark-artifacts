import { program } from '@commander-js/extra-typings'
import commands from './commands/index.js'

for (const command of commands) program.addCommand(command)

export default program
