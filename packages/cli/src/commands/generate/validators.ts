import { existsSync } from 'node:fs'
import { extname } from 'node:path'

export const validateSourceInput = (source: string): boolean => existsSync(source) && extname(source) === '.circom'
