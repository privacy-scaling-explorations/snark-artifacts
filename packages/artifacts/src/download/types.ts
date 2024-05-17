export type SnarkArtifacts = Record<'wasm' | 'zkey', string>

type Digit = `${number}`
type PreRelease = 'alpha' | 'beta'
export type Version =
  | `${Digit}.${Digit}.${Digit}`
  | `${Digit}.${Digit}.${Digit}-${PreRelease}`
  | `${Digit}.${Digit}.${Digit}-${PreRelease}.${Digit}`
  | 'latest'
