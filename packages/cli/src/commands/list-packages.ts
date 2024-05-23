import { Command } from '@commander-js/extra-typings'

export const listPackages = new Command('list-packages').description('List all available packages').action(() => {
  console.log('List all available packages')
})
