<p align="center">
    <h1 align="center">
        🗄️ SNARK Artifacts
    </h1>
    <p align="center">A streamlined mechanism for distributing SNARK artifacts.</p>
</p>

| [P0tion](https://github.com/privacy-scaling-explorations/p0tion) has made conducting SNARK phase 2 trusted setup ceremonies easier for many zero-knowledge projects. However, there still seems to be no simple mechanism for distributing the artifacts generated in ceremonies. This project aims to build step-by-step a simple and easily accessible mechanism for distributing zero-knowledge artifacts (`wasm`/`zkey` files). |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

<div align="center">
    <h4>
        <a href="/CONTRIBUTING.md">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="/CODE_OF_CONDUCT.md">
            🤝 Code of conduct
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://github.com/privacy-scaling-explorations/snark-artifacts/issues/new/choose">
            🔎 Issues
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://discord.com/invite/sF5CT5rzrR">
            🗣️ Chat &amp; Support
        </a>
    </h4>
</div>

For more info here see: [OVERVIEW.md](https://github.com/privacy-scaling-explorations/snark-artifacts/blob/main/OVERVIEW.md).

Interested in contributing to this project? See the [board](https://github.com/orgs/privacy-scaling-explorations/projects/45/views/1) and upcoming issues to work on or [propose other ideas](https://github.com/privacy-scaling-explorations/snark-artifacts/issues).

> [!NOTE]\
> This system is probably best suited to small and medium-sized circuits.

## Artifacts

<table>
    <th>Package</th>
    <th>Version</th>
    <th>Downloads</th>
    <th>Circuits</th>
    <th>JS library</th>
    <tbody>
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
                <a href="https://github.com/privacy-scaling-explorations/zk-kit.circom/blob/main/packages/poseidon-proof/src/poseidon-proof.circom">
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
        <tr>
            <td>
                <a href="https://github.com/privacy-scaling-explorations/snark-artifacts/tree/main/packages/semaphore-identity">
                    @zk-kit/semaphore-identity-artifacts
                </a>
            </td>
            <td>
                <!-- NPM version -->
                <a href="https://npmjs.org/package/@zk-kit/semaphore-identity-artifacts">
                    <img src="https://img.shields.io/npm/v/@zk-kit/semaphore-identity-artifacts.svg?style=flat-square" alt="NPM version" />
                </a>
            </td>
            <td>
                <!-- Downloads -->
                <a href="https://npmjs.org/package/@zk-kit/semaphore-identity-artifacts">
                    <img src="https://img.shields.io/npm/dm/@zk-kit/semaphore-identity-artifacts.svg?style=flat-square" alt="Downloads" />
                </a>
            </td>
            <td>
                <a href="https://github.com/semaphore-protocol/extensions/blob/main/packages/identity-proof.circom/src/identity-proof.circom">
                    identity-proof.circom
                </a>
            </td>
            <td>
                <a href="https://github.com/semaphore-protocol/extensions/tree/main/packages/identity-proof">
                    @semaphore-extensions/identity-proof
                </a>
            </td>
        </tr>
    <tbody>
</table>

## 🚀 Features

- ✅ **Reliable endpoints**: A curated set of SNARK artifacts ready for use in various zero-knowledge proof applications across major CDNs.
- ⏳ **Easy Integration**: Seamless integration with existing cryptographic frameworks and systems through utility functions.
- ⏳ **Linear versioning mechanism**: A simple and consistent versioning system that reflects changes in relative circuits.
- ❌ **File integrity**: A system that guarantees the integrity of the artifacts.
- ❌ **Automated Distribution**: A system that automatically distributes artifacts after the ceremony (possibly through [P0tion](https://github.com/privacy-scaling-explorations/p0tion)).

## 📜 Getting Started

To add a new set of artifacts for your project, simply add your NPM package to the [`packages`](https://github.com/privacy-scaling-explorations/snark-artifacts/tree/main/packages) folder. The packages are published on NPM and made available on your preferred CDN (e.g. https://unpkg.com).

You can also create [issue](https://github.com/privacy-scaling-explorations/snark-artifacts/issues/new/choose) and let the core contributors add your files.

### Partial clone

For a more manageable clone that includes only the packages relevant to you or none of them, we use git's [`sparse-checkout`](https://git-scm.com/docs/git-sparse-checkout) and [`--filter`](https://git-scm.com/docs/git-rev-list#Documentation/git-rev-list.txt---filterltfilter-specgt) features. This will reduce clone time and improve git performance.

```bash
git clone --sparse --filter=blob:none <forkedUrl>
```

And finally, if you need a specific package:

```bash
git sparse-checkout add packages/<package>
```

For convenience we provide an interactive [`setup`](https://github.com/privacy-scaling-explorations/snark-artifacts/tree/main/scripts/bin/setup) script.\
It will ask you where to clone the repository, and what packages you want to sparse checkout.

```bash
bash <(curl https://raw.githubusercontent.com/privacy-scaling-explorations/snark-artifacts/main/scripts/bin/setup) fetch
```

After the first time clone, you can use the following npm scripts:

- `npm run sparse-checkout`: to add/remove packages from sparse checkout.
- `npm run gprf`: pull rebase your active branch with `--filter=blob:none` to avoid downloading what you may not want (unfortunately sparse checkout alone won't prevent syncing what you haven't sparsed checkout).

### Downloading artifacts

ZK-Kit provides a set of functions to automatically download your artifacts. For example:

```ts
import { maybeGetEdDSASnarkArtifacts } from '@zk-kit/utils'

// It will return the artifacts' paths.
const { wasm, zkey } = await maybeGetEdDSASnarkArtifacts()

console.log(wasm) // "/tmp/@zk-kit/eddsa-artifacts@latest/eddsa.wasm"
console.log(zkey) // "/tmp/@zk-kit/eddsa-artifacts@latest/eddsa.zkey"

// Paths on browsers will be the `unpkg` URLs directly.
// e.g. https://unpkg.com/@zk-kit/eddsa-artifacts@latest/eddsa.zkey
```

You can download all artifacts from this repository with:

```bash
bash <(curl -sSL https://raw.githubusercontent.com/privacy-scaling-explorations/snark-artifacts/main/scripts/bin/dowload-artifacts) -h
```
