import { stdout } from 'node:process'
import { Cli } from '../src/cli'

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
    consoleSpy.mockClear()
  })

  it('should display the help message', async () => {
    cli.cli.exitOverride().configureOutput({
      writeOut(str) {
        expect(str).toMatchInlineSnapshot(`
"Usage: snarkli [options] [command]

Options:
  -h, --help                      display help for command

Commands:
  download|d [options] <project>  Download all available artifacts for a given
                                  project
  download-all|da <project>       Download all available artifacts for a given
                                  project
  generate|g [options]            Generate snark artifacts for a given source
                                  circom circuit
  list-packages|lp                List all available packages
  help [command]                  display help for command
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
      await run(['download', 'poseidon', '-a', '2'])
      expect(consoleSpy).toHaveBeenCalledTimes(1)
      expect(consoleSpy.mock.calls[0]).toMatchInlineSnapshot(`
        [
          "Download artifacts for project:",
          "poseidon",
          "with args:",
          [
            "2",
          ],
        ]
      `)
    })
  })
})
