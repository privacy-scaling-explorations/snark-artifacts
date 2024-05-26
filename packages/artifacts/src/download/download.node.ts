import { createWriteStream, existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import os from 'node:os'
import { dirname } from 'node:path'
import type { Urls } from './cdns'
import { getSnarkArtifactUrls } from './download.browser'
import type { SnarkArtifacts } from './types'

async function fetchRetry(urls: string[]): Promise<ReturnType<typeof fetch>> {
  const [url] = urls
  if (!url) throw new Error('No urls to try')
  return fetch(url).catch(() => fetchRetry(urls.slice(1)))
}

async function download(urls: Urls, outputPath: string) {
  const { body, ok, statusText, url } = await fetchRetry(urls as unknown as string[])
  if (!ok)
    throw new Error(`Failed to fetch ${url}: ${statusText}`)
  if (!body) throw new Error('Failed to get response body')

  const dir = dirname(outputPath)
  await mkdir(dir, { recursive: true })

  const fileStream = createWriteStream(outputPath)
  const reader = body.getReader()

  try {
    const pump = async () => {
      const { done, value } = await reader.read()
      if (done) {
        fileStream.end()
        return
      }

      fileStream.write(Buffer.from(value))
      await pump()
    }

    await pump()
  } catch (error) {
    fileStream.close()
    throw error
  }
}

// https://unpkg.com/@zk-kit/poseidon-artifacts@latest/poseidon.wasm -> @zk/poseidon-artifacts@latest/poseidon.wasm
const extractEndPath = (url: string) => url.substring(url.indexOf('@zk'))

async function maybeDownload(urls: Urls) {
  const outputPath = `${os.tmpdir()}/${extractEndPath(urls[0])}`

  if (!existsSync(outputPath)) await download(urls, outputPath)

  return outputPath
}

/**
 * Downloads SNARK artifacts (`wasm` and `zkey`) files if not already present in OS tmp folder.
 * @example
 * ```ts
 * {
 *   wasm: "/tmp/@zk-kit/semaphore-artifacts@latest/semaphore-3.wasm",
 *   zkey: "/tmp/@zk-kit/semaphore-artifacts@latest/semaphore-3.zkey" .
 * }
 * ```
 * @returns {@link SnarkArtifacts}
 */
export default async function maybeGetSnarkArtifacts(
  ...pars: Parameters<typeof getSnarkArtifactUrls>
): Promise<SnarkArtifacts> {
  const { wasms, zkeys } = getSnarkArtifactUrls(
    ...pars,
  )
  const [wasm, zkey] = await Promise.all([
    maybeDownload(wasms),
    maybeDownload(zkeys),
  ])

  return {
    wasm,
    zkey,
  }
}
