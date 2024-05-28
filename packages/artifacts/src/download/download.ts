import { createWriteStream, existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname } from 'node:path'
import type { Urls } from './urls.ts'

async function fetchRetry(urls: string[]): Promise<ReturnType<typeof fetch>> {
  const [url] = urls
  if (!url) throw new Error('No urls to try')
  return fetch(url).catch(() => fetchRetry(urls.slice(1)))
}

export async function download(urls: Urls, outputPath: string) {
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

export async function maybeDownload(urls: Urls) {
  const outputPath = `${tmpdir()}/${extractEndPath(urls[0])}`
  if (!existsSync(outputPath)) await download(urls, outputPath)
  return outputPath
}
