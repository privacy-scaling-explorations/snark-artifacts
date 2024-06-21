import { createWriteStream, existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import type { Urls } from './urls.ts'

export async function download(url: string, outputPath: string) {
  const { body, ok, statusText } = await fetch(url)
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

export async function maybeDownload(url: string, outputPath: string) {
  if (!existsSync(outputPath)) await download(url, outputPath)
  return outputPath
}
