import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import maybeGetSnarkArtifactsBrowser from '../src/download/index.browser'
import maybeGetSnarkArtifacts from '../src/download/index.node'
import { getAvailableVersions, getSnarkArtifactUrls } from '../src/download/urls'
import { Project } from '../src/projects'

const version = '1.0.0'

describe('getAvailableVersions', () => {
  it('Should return available versions', async () => {
    const versions = await getAvailableVersions(Project.POSEIDON)

    expect(versions).toContain(version)
  }, 20_000)
})

describe('getSnarkArtifactUrls', () => {
  it('Should return valid urls', async () => {
    const { wasms, zkeys } = await getSnarkArtifactUrls(Project.POSEIDON, {
      parameters: ['2'],
      version,
    })

    for (const url of wasms)
      await expect(fetch(url)).resolves.toHaveProperty('ok', true)
    for (const url of zkeys)
      await expect(fetch(url)).resolves.toHaveProperty('ok', true)
  }, 20_000)

  it('should throw if the project is not supported', async () => {
    await expect(
      getSnarkArtifactUrls('project' as Project, {
        parameters: ['2'],
        version: 'latest',
      }),
    ).rejects.toThrow("Project 'project' is not supported")
  })

  it('should throw if the version is not available', async () => {
    await expect(
      getSnarkArtifactUrls(Project.POSEIDON, {
        parameters: ['2'],
        version: '0.1.0-beta',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Version '0.1.0-beta' is not available for project 'poseidon'"`,
    )
  })
})

describe('MaybeGetSnarkArtifacts', () => {
  let fetchSpy: jest.SpyInstance
  let mkdirSpy: jest.SpyInstance
  let createWriteStreamSpy: jest.SpyInstance
  let existsSyncSpy: jest.SpyInstance

  beforeEach(() => {
    // @ts-expect-error non exhaustive mock of fetch
    fetchSpy = jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => ({ versions: { [version]: {} } }),
    })
    createWriteStreamSpy = jest.spyOn(fs, 'createWriteStream')
    existsSyncSpy = jest.spyOn(fs, 'existsSync')
    mkdirSpy = jest.spyOn(fsPromises, 'mkdir')
    mkdirSpy.mockResolvedValue(undefined)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('Should throw an error if the project is not supported', async () => {
    await expect(
      maybeGetSnarkArtifacts('project' as Project, {
        parameters: ['2'],
        version: 'latest',
      }),
    ).rejects.toThrow("Project 'project' is not supported")

    await expect(
      maybeGetSnarkArtifactsBrowser('project' as Project),
    ).rejects.toThrow("Project 'project' is not supported")
  })

  it('Should throw on fetch errors', async () => {
    existsSyncSpy.mockReturnValue(false)
    fetchSpy.mockResolvedValueOnce({
      ok: false,
      statusText: 'TEST',
      url: 'https://test.com',
    })

    await expect(
      maybeGetSnarkArtifacts(Project.POSEIDON, {
        parameters: ['2'],
        version: 'latest',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Failed to fetch https://test.com: TEST"`,
    )
  })

  it('Should throw if missing body', async () => {
    existsSyncSpy.mockReturnValue(false)
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      statusText: 'OK',
    })

    await expect(
      maybeGetSnarkArtifacts(Project.POSEIDON, {
        parameters: ['2'],
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Failed to get response body"`,
    )
  })

  it('Should throw on stream error', async () => {
    existsSyncSpy.mockReturnValue(false)
    const mockResponseStream = {
      body: {
        getReader: jest.fn(() => ({
          read: jest.fn().mockRejectedValueOnce(new Error('TEST STREAM ERROR')),
        })),
      },
      ok: true,
      statusText: 'OK',
    }
    fetchSpy.mockResolvedValue(mockResponseStream)
    createWriteStreamSpy.mockReturnValue({
      close: jest.fn(),
      end: jest.fn(),
      write: jest.fn(),
    })

    await expect(
      maybeGetSnarkArtifacts(Project.POSEIDON, {
        parameters: ['2'],
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"TEST STREAM ERROR"`)
  })

  it("Should download files only if don't exist yet", async () => {
    existsSyncSpy.mockReturnValue(true)

    await maybeGetSnarkArtifacts(Project.POSEIDON, { parameters: ['2'] })

    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenLastCalledWith('https://registry.npmjs.org/@zk-kit/poseidon-artifacts')
  })

  it('Should return artifact file paths in node environment', async () => {
    mkdirSpy.mockRestore()
    existsSyncSpy.mockReturnValue(false)

    const { wasm, zkey } = await maybeGetSnarkArtifacts(Project.POSEIDON, {
      parameters: ['2'],
    })

    expect(wasm).toMatchInlineSnapshot(
      `"/tmp/@zk-kit/poseidon-artifacts@latest/poseidon-2.wasm"`,
    )
    expect(zkey).toMatchInlineSnapshot(
      `"/tmp/@zk-kit/poseidon-artifacts@latest/poseidon-2.zkey"`,
    )

    expect(fetchSpy).toHaveBeenCalledTimes(3)
    expect(fetchSpy).toHaveBeenNthCalledWith(1, 'https://registry.npmjs.org/@zk-kit/poseidon-artifacts')
    expect(fetchSpy).toHaveBeenNthCalledWith(2, 'https://unpkg.com/@zk-kit/poseidon-artifacts@latest/poseidon-2.wasm')
    expect(fetchSpy).toHaveBeenNthCalledWith(3, 'https://unpkg.com/@zk-kit/poseidon-artifacts@latest/poseidon-2.zkey')
  }, 25_000)

  it('Should return artifact file paths with parameters in browser environment', async () => {
    const { wasm, zkey } = await maybeGetSnarkArtifactsBrowser(
      Project.POSEIDON,
      {
        parameters: ['2'],
      },
    )

    expect(wasm).toMatchInlineSnapshot(
      `"https://unpkg.com/@zk-kit/poseidon-artifacts@latest/poseidon-2.wasm"`,
    )
    expect(zkey).toMatchInlineSnapshot(
      `"https://unpkg.com/@zk-kit/poseidon-artifacts@latest/poseidon-2.zkey"`,
    )
  })

  it('Should return artifact files paths without parameters in browser environment', async () => {
    const { wasm, zkey } = await maybeGetSnarkArtifactsBrowser(
      Project.SEMAPHORE,
    )

    expect(wasm).toMatchInlineSnapshot(
      `"https://unpkg.com/@zk-kit/semaphore-artifacts@latest/semaphore.wasm"`,
    )
    expect(zkey).toMatchInlineSnapshot(
      `"https://unpkg.com/@zk-kit/semaphore-artifacts@latest/semaphore.zkey"`,
    )
  })
})
