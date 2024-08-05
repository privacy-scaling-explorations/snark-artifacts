// import { writeFileSync } from 'node:fs'
import { rm } from 'node:fs/promises'
import { stdout } from 'node:process'
import { Cli } from '../../src/cli/cli'

describe('CLI', () => {
  let cli: Cli
  const consoleSpy = jest.spyOn(console, 'log')
  const run = async (args: string[]) => cli.run(['node', 'snarkli.js', ...args])

  beforeAll(() => {
    // avoid polluting stdout/sterr with command results' during tests
    jest.spyOn(stdout, 'write').mockImplementation(() => true)
  })
  beforeEach(() => {
    cli = new Cli()
  })
  afterEach(() => {
    consoleSpy.mockClear()
    // consoleSpy.mockRestore()
  })

  it('should display the help message', async () => {
    cli.cli.exitOverride().configureOutput({
      writeOut(str) {
        expect(str).toMatchInlineSnapshot(`
"Usage: snarkli [options] [command]

Options:
  -h, --help                                     display help for command

Commands:
  download|d [options] [project]                 Download all available artifacts for a given project
  generate|g [options] [circuit] [params...]     Generate snark artifacts for a given source circom circuit
  generate-batch|gb <optionsPath> <destination>  Generate snark artifacts for a list of circom circuits
  list|l                                         List all projects and their available packages versions
  help [command]                                 display help for command
"
`)
      },
    })

    await expect(run(['--help'])).rejects.toMatchInlineSnapshot(
      '[CommanderError: (outputHelp)]',
    )
  })

  describe('download', () => {
    it('should download artifacts for the specified project', async () => {
      await run(['download', 'poseidon', '-p', '2'])
      expect(consoleSpy).toHaveBeenCalledTimes(1)
      expect(consoleSpy.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "Artifacts downloaded at:
          /tmp/snark-artifacts/poseidon/latest/poseidon-2.wasm
          /tmp/snark-artifacts/poseidon/latest/poseidon-2.zkey",
        ]
      `)
    }, 30_000)
  })

  describe('generate', () => {
    const circomkitJson = 'circomkit.json'

    afterAll(async () => {
      await rm(circomkitJson).catch(() => {
        /* swallow */
      })
    })

    it.todo('should generate artifacts')
  })

  describe('list', () => {
    it('should list all projects and the available versions', async () => {
      await run(['list'])
      expect(consoleSpy.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "poseidon
          1.0.0
          1.0.0-beta.1
        semaphore
          1.0.0
          4.0.0-beta.9
          4.0.0-beta.10
          4.0.0-beta.11
          4.0.0-beta.17
          4.0.0-beta.18
          4.0.0
        semaphore-identity
          1.0.0-beta
          1.0.0-beta.2
        ",
        ]
      `)
    })
  })
})
