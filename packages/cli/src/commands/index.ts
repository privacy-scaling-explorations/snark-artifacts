import { downloadAll } from './download-all.ts'
import { download } from './download/index.ts'
import { generate } from './generate/index.ts'
import { listPackages } from './list-packages.ts'

export default [download, downloadAll, generate, listPackages]
