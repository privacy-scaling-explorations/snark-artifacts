<p align="center">
    <h1 align="center">
        🗝 Snark Artifacts
    </h1>
    <p align="center">A streamlined mechanism for distributing SNARK artifacts.</p>
</p>

<table>
    <th>Package</th>
    <th>Version</th>
    <th>Downloads</th>
    <th>Circuits</th>
    <th>JS library</th>
    <tbody>
        <tr>
            <td>
                <a href="https://github.com/privacy-scaling-explorations/snark-artifacts/tree/main/packages/eddsa">
                    @zk-kit/eddsa-artifacts
                </a>
            </td>
            <td>
                <!-- NPM version -->
                <a href="https://npmjs.org/package/@zk-kit/eddsa-artifacts">
                    <img src="https://img.shields.io/npm/v/@zk-kit/eddsa-artifacts.svg?style=flat-square" alt="NPM version" />
                </a>
            </td>
            <td>
                <!-- Downloads -->
                <a href="https://npmjs.org/package/@zk-kit/eddsa-artifacts">
                    <img src="https://img.shields.io/npm/dm/@zk-kit/eddsa-artifacts.svg?style=flat-square" alt="Downloads" />
                </a>
            </td>
            <td>
                <a href="https://github.com/privacy-scaling-explorations/zk-kit/blob/main/packages/circuits/circom/eddsa-proof.circom">
                    eddsa-proof.circom
                </a>
            </td>
            <td>
                <a href="https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/eddsa-proof">
                    @zk-kit/eddsa-proof
                </a>
            </td>
        </tr>
        <tr>
            <td>
                <a href="https://github.com/privacy-scaling-explorations/snark-artifacts/tree/main/packages/poseidon">
                    @zk-kit/poseidon-artifacts
                </a>
            </td>
            <td>
                <!-- NPM version -->
                <a href="https://npmjs.org/package/@zk-kit/poseidon-artifacts">
                    <img src="https://img.shields.io/npm/v/@zk-kit/poseidon-artifacts.svg?style=flat-square" alt="NPM version" />
                </a>
            </td>
            <td>
                <!-- Downloads -->
                <a href="https://npmjs.org/package/@zk-kit/poseidon-artifacts">
                    <img src="https://img.shields.io/npm/dm/@zk-kit/poseidon-artifacts.svg?style=flat-square" alt="Downloads" />
                </a>
            </td>
            <td>
                <a href="https://github.com/privacy-scaling-explorations/zk-kit/blob/main/packages/circuits/circom/poseidon-proof.circom">
                    poseidon-proof.circom
                </a>
            </td>
            <td>
                <a href="https://github.com/privacy-scaling-explorations/zk-kit/tree/main/packages/poseidon-proof">
                    @zk-kit/poseidon-proof
                </a>
            </td>
        </tr>
        <tr>
            <td>
                <a href="https://github.com/privacy-scaling-explorations/snark-artifacts/tree/main/packages/semaphore">
                    @zk-kit/semaphore-artifacts
                </a>
            </td>
            <td>
                <!-- NPM version -->
                <a href="https://npmjs.org/package/@zk-kit/semaphore-artifacts">
                    <img src="https://img.shields.io/npm/v/@zk-kit/semaphore-artifacts.svg?style=flat-square" alt="NPM version" />
                </a>
            </td>
            <td>
                <!-- Downloads -->
                <a href="https://npmjs.org/package/@zk-kit/semaphore-artifacts">
                    <img src="https://img.shields.io/npm/dm/@zk-kit/semaphore-artifacts.svg?style=flat-square" alt="Downloads" />
                </a>
            </td>
            <td>
                <a href="https://github.com/semaphore-protocol/semaphore/blob/main/packages/circuits/src/semaphore.circom">
                    semaphore.circom
                </a>
            </td>
            <td>
                <a href="https://github.com/semaphore-protocol/semaphore/tree/main/packages/proof">
                    @semaphore-protocol/proof
                </a>
            </td>
        </tr>
    <tbody>
</table>

| [P0tion](https://github.com/privacy-scaling-explorations/p0tion) has made conducting SNARK phase 2 trusted setup ceremonies easier for many zero-knowledge projects. However, there still seems to be no simple mechanism for distributing the artifacts generated in ceremonies. This project aims to build step-by-step a simple and easily accessible mechanism for distributing zero-knowledge artifacts (`wasm`/`zkey` files). |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

For more info here see: [snark-artifacts-distribution.md](https://github.com/privacy-scaling-explorations/snark-artifacts/blob/main/snark-artifacts-distribution.md).

Interested in contributing to this project? See the [board](https://github.com/orgs/privacy-scaling-explorations/projects/45/views/1) and upcoming issues to work on or [propose other ideas](https://github.com/privacy-scaling-explorations/snark-artifacts/issues).

> [!NOTE]  
> This system is probably best suited to small and medium-sized circuits.

## 🚀 Features

- ✅ **Reliable endpoints**: A curated set of SNARK artifacts ready for use in various zero-knowledge proof applications across major CDNs.
- ⏳ **Easy Integration**: Seamless integration with existing cryptographic frameworks and systems through utility functions.
- ⏳ **Linear versioning mechanism**: A simple and consistent versioning system that reflects changes in relative circuits.
- ❌ **File integrity**: A system that guarantees the integrity of the artifacts.
- ❌ **Automated Distribution**: A system that automatically distributes artifacts after the ceremony (possibly through [P0tion](https://github.com/privacy-scaling-explorations/p0tion)).

## 📜 Getting Started

To add a new set of artifacts for your project, simply add your NPM package to the [`packages`](https://github.com/privacy-scaling-explorations/snark-artifacts/tree/main/packages) folder. The packages are published on NPM and made available on your preferred CDN (e.g. https://unpkg.com).

ZK-Kit provides a set of functions to automatically download your artifacts. For example:

```ts
import { maybeGetEdDSASnarkArtifacts } from "@zk-kit/utils"

// It will return the artifacts' paths.
const { wasm, zkey } = await maybeGetEdDSASnarkArtifacts()

console.log(wasm) // "/tmp/@zk-kit/eddsa-artifacts@latest/eddsa.wasm"
console.log(zkey) // "/tmp/@zk-kit/eddsa-artifacts@latest/eddsa.zkey"

// Paths on browsers will be the `unpkg` URLs directly.
// e.g. https://unpkg.com/@zk-kit/eddsa-artifacts@latest/eddsa.zkey
```

You can download all artifacts from this repository with:

```bash
bash <(curl -sSL https://raw.githubusercontent.com/privacy-scaling-explorations/snark-artifacts/main/dowload-artifacts) -h
```

