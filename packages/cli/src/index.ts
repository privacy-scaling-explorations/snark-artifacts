import { exit } from 'node:process'
import program from 'program'

const main = async () => {
  await program.parseAsync(process.argv)
}

main().catch((err) => {
  console.error(err)
  exit(1)
})
