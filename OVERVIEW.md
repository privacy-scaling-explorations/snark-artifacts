# SNARK Artifacts Overview

## Table of Contents

- [Summary](#Summary)
- [Problem](#Problem)
- [Background](#Background)
- [Goals](#Goals)
- [Solution](#Solution)
- [Conclusion](#Conclusion)

## Summary

This document outlines a strategy for efficient management and distribution of SNARK artifacts, which are essential for verifying or creating zero-knowledge proofs but are challenging to distribute due to their size.
This project propose a solution leveraging [npm](https://www.npmjs.com/) and for version control, distribution, and integrity checks, focusing on ease of access and reusability within the community.

## Problem

SNARK artifacts are relatively large binary files (typically `.wasm` and `.zkey` files) required across numerous projects for cryptographic operations. If these operations take place in a browser, including the SNARK artifacts in the JavaScript libraries can increase the size of the bundle by many MB, depending on the project.
Their size and frequent updates pose challenges for version control, efficient distribution, and project repository bloat, necessitating an effective management and distribution solution.

## Background

Cryptographic proofs, particularly those involving SNARKs, require specific artifacts that are circuit specific (e.g. see [phase 2 `.zkey`](https://docs.circom.io/getting-started/proving-circuits/#phase-2)) for proof verification and generation.

## Goals

-   Efficiently distribute SNARK artifacts without repository bloat.
-   Ensure artifacts are easily accessible and reusable by the community.
-   Provide version control for artifacts to enable access to different versions as needed.
-   Implement integrity checks to ensure artifact authenticity.

### Non (immediate) goals

-   Automate file distribution.
-   Decentralize version control (e.g. [Radicle](https://radicle.xyz)).
-   Decentralize file distribution (e.g. [IPFS](https://www.ipfs.tech)).

## Solution

| Tool   | Purpose                                      | Pros                                                                                                                    | Cons                                                      |
| ------ | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Git    | - Version control.                           |                                                                                                                         |                                                           |
| GitHub | - Repository management.<br>- Hosting.       |                                                                                                                         | - Centralization.<br>- Repository bloat.                  |
| npm    | - Versioning.<br>- Distribution as packages. | - Integrity checks (`npm audit signatures`).                                                                            | - Centralization.<br>- Bloat if included as dependencies. |
| CDN    | - Files distribution.                        | - Fast.<br>- Light: no need to include artifacts in project build as dependencies.<br>- Compatible with npm versioning. | - Centralized.<br>- No integrity check.                   |

### GitHub/Git

GitHub/Git are used for the detailed management of the artifact repository, offering advantages like [sparse-checkout](https://git-scm.com/docs/git-sparse-checkout). This feature is particularly useful for developers needing access to a subset of artifacts, reducing the footprint and speeding up the local setup and development process.

### npm

npm is central to this solution, serving not only for version control and distribution but also for ensuring the integrity of the artifacts. After artifacts are fetched from a CDN, the integrity of these packages can be verified using NPM's built-in capabilities such as npm audit and signature verifications. This adds an essential layer of security, ensuring that the downloaded artifacts have not been tampered with and are exactly as published. It's a vital step for cryptographic artifacts where integrity is paramount.

The npm packages will be part of the `@zk-kit` npm org and will have the following format: `@zk-kit/{eddsa,poseidon,semaphore}-artifacts`.

### CDN

CDNs (e.g. [unpkg](https://unpkg.com)) provide a layer for the npm packages, enabling fast and reliable access to artifacts worldwide. This service allows projects to use artifacts without including them directly in their build, optimizing download times and minimizing bandwidth usage. Despite being a centralized distribution method, it offers unparalleled ease of access to the necessary files.

## Conclusion

In summary, this approach leverages the strengths of each platform to address the distribution, version control, and security of SNARK artifacts. GitHub/Git enhances repository management and selective access for developers, NPM ensures artifact integrity and manages versions, and CDNs facilitate fast, global distribution. This strategy effectively meets the challenges of managing relatively large, frequently updated cryptographic artifacts in a secure and efficient manner.
