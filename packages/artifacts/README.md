<p align="center">
    <h1 align="center">
        @zk-kit/artifacts
    </h1>
</p>
<p align="center">
    <a href="https://npmjs.org/package/@zk-kit/artifacts">
        <img src="https://img.shields.io/npm/v/@zk-kit/artifacts.svg?style=flat-square" alt="NPM version" />
    </a>
    <a href="https://npmjs.org/package/@zk-kit/artifacts">
        <img src="https://img.shields.io/npm/dm/@zk-kit/artifacts.svg?style=flat-square" alt="Downloads" />
    </a>
</p>

## Downloading artifacts

`@zk-kit/artifacts` provides a set of functions to automatically download your artifacts. For example:

```ts
import { maybeGetSnarkArtifacts, Project } from '@zk-kit/artifacts'

// It will return the artifacts' paths.
const { wasm, zkey } = await maybeGetSnarkArtifacts(Project.POSEIDON, {
  parameters: [2],
  version: '1.0.0',
})

console.log(wasm) // "/tmp/@zk-kit/poseidon-artifacts@1.0.0/poseidon-2.wasm"
console.log(zkey) // "/tmp/@zk-kit/poseidon-artifacts@1.0.0/poseidon-2.zkey"

// Paths on browsers will be the `unpkg` URLs directly.
// e.g. https://unpkg.com/@zk-kit/poseidon-artifacts@1.0.0/poseidon-2.zkey
```

## CLI

Or you can install our `snarkli` CLI to download artifacts, list available packages or generate artifacts (`.zkey`, `.wasm`) from `.circom` source files.

```commandline
pnpm add -g @zk-kit/artifacts
snarkli
```
