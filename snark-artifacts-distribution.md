# Management and Distribution of SNARK Artifacts

## Summary

This document outlines a strategy for efficient management and distribution of SNARK artifacts, which are essential for verifying or creating cryptographic proofs but are challenging to distribute due to their size.
We propose a solution leveraging [npm](https://www.npmjs.com/) and [unpkg](https://unpkg.com) for version control, distribution, and integrity checks, focusing on ease of access and reusability within the community.

## Problem

SNARK artifacts are relatively large binary files required across numerous projects for cryptographic operations.
Their size and frequent updates pose challenges for version control, efficient distribution, and project repository bloat, necessitating an effective management and distribution solution.

## Background

Cryptographic proofs, particularly those involving SNARKs, require specific artifacts that are circuit specific (e.g. see [phase 2 `.zkey`](https://docs.circom.io/getting-started/proving-circuits/#phase-2)) for verification and proof creation.
These artifacts, while essential, are large and subject to versioning, making direct inclusion in (web) projects impractical.

## Goals

- Efficiently distribute SNARK artifacts without repository bloat.
- Ensure artifacts are easily accessible and reusable by the community.
- Provide version control for artifacts to enable access to different versions as needed.
- Implement integrity checks to ensure artifact authenticity.

## Non (immediate) goals

- Decentralized distribution of artifacts.
- Real-time updates or dynamic fetching of artifacts within consumer packages.

## Solution: hybrid npm + unpkg + git/github

| Tool   | Purpose                              | Pros                                                                                                                    | Cons                                                      |
| ------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Git    | Version control                      |                                                                                                                         |                                                           |
| GitHub | Repository management & hosting      |                                                                                                                         | - Centralization.<br>- Repository bloat.                  |
| npm    | versioning, distribution as packages | Integrity checks (`npm audit signatures`)                                                                               | - Centralization.<br>- Bloat if included as dependencies. |
| unpkg  | Files distribution                   | - Fast.<br>- Light: no need to include artifacts in project build as dependencies.<br>- Compatible with npm versioning. | - Centralized.<br>- No integrity check.                   |

### npm

npm is central to this solution, serving not only for version control and distribution but also for ensuring the integrity of the artifacts. After artifacts are fetched from Unpkg, the integrity of these packages can be verified using NPM's built-in capabilities such as npm audit and signature verifications. This adds an essential layer of security, ensuring that the downloaded artifacts have not been tampered with and are exactly as published. It's a vital step for cryptographic artifacts where integrity is paramount.  
The npm package would belong be managed by the `@zk-kit` npm org.  
We are considering either having

- one main packages with all artifacts in `@zk-kit/artifacts`(`/{eddsa,poseidon-{1..16},semaphore-{1..12}}.{wasm,zkey})
- multiple packages: `@zk-kit/{eddsa,poseidon,semaphore}/...`

### unpkg

unpkg provides a CDN layer for the npm packages, enabling fast and reliable access to artifacts worldwide. This service allows projects to use artifacts without including them directly in their build, optimizing download times and minimizing bandwidth usage. Despite being a centralized distribution method, it offers unparalleled ease of access to the necessary files.

### GitHub/Git

GitHub/Git are used for the detailed management of the artifact repository, offering advantages like [sparse-checkout](https://git-scm.com/docs/git-sparse-checkout). This feature is particularly useful for developers needing access to a subset of artifacts, reducing the footprint and speeding up the local setup and development process.

## Conclusion

In summary, this integrated approach leverages the strengths of each platform to address the distribution, version control, and security of SNARK artifacts. NPM ensures artifact integrity and manages versions; Unpkg facilitates fast, global distribution; and GitHub/Git enhances repository management and selective access for developers. This strategy effectively meets the challenges of managing large, frequently updated cryptographic artifacts in a secure and efficient manner.

## Future improvements

- Explore Decentralized Distribution: As a future improvement, consider integrating decentralized distribution options, such as [IPFS](https://www.ipfs.tech) and [Radicle](https://radicle.xyz), to complement the existing solution and align with decentralized principles.
