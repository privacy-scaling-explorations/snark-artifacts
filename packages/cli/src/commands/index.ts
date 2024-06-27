import { download } from './download/index.ts'
import { generateBatch } from './generate-batch/index.ts'
import { generate } from './generate/index.ts'
import { list } from './list.ts'

export default [download, generate, generateBatch, list]
