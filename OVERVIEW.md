# SNARK Artifacts Registry Overview

## Table of Contents

- [Summary](#Summary)
- [Problem](#Problem)
- [Background](#Background)
- [Goals](#Goals)
- [Solution](#Solution)
- [Conclusion](#Conclusion)

## Summary

This document outlines a strategy for efficient management and distribution of SNARK artifacts, which are essential for verifying or creating zero-knowledge proofs but are challenging to distribute due to their size.
This project propose a solution leveraging [npm](https://www.npmjs.com/) for versioning and integrity checks, and AWS [S3](https://aws.amazon.com/s3/)+[CloudFront](https://aws.amazon.com/de/cloudfront/) for distribution; focusing on ease of access and reusability within the community.

## Problem

SNARK artifacts are relatively large binary files (typically `.wasm`, `.zkey` and `.json` files) required across numerous projects for cryptographic operations. If these operations take place in a browser, including the SNARK artifacts in the JavaScript libraries can increase the size of the bundle by many MBs depending on the project.
Their size and frequent updates pose challenges for version control, efficient distribution, and project repository bloat, necessitating an effective management and distribution solution.

## Background

Cryptographic proofs, particularly those involving SNARKs, require specific artifacts that are circuit specific (e.g. see [phase 2 `.zkey`](https://docs.circom.io/getting-started/proving-circuits/#phase-2)) for proof verification and generation.

## Goals

- Efficiently distribute SNARK artifacts without repository bloat.
- Ensure artifacts are easily accessible and reusable by the community.
- Provide version control for artifacts to enable access to different versions as needed.
- Implement integrity checks to ensure artifact authenticity.

### Non (immediate) goals

- Automate file distribution.
- Decentralize version control (e.g. [Radicle](https://radicle.xyz)).
- Decentralize file distribution (e.g. [IPFS](https://www.ipfs.tech)).

## Solution

| Tool                    | Purpose                                            | Pros                                                                                                                    | Cons                                                      |
| ----------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Git                     | - Version control.                                 |                                                                                                                         |                                                           |
| GitHub                  | - Repository management.<br>- Hosting.             |                                                                                                                         | - Centralization.<br>- Repository bloat.                  |
| npm                     | - Versioning.<br>- Distribution as packages.       | - Integrity checks (`npm audit signatures`).                                                                            | - Centralization.<br>- Bloat if included as dependencies. |
| AWS S3 + CloudFront CDN | - Files distribution.                              | - Fast.<br>- Light: no need to include artifacts in project build as dependencies.<br>- Compatible with npm versioning. | - Centralized.<br>- No integrity check.                   |
| Web Application         | - Provide a simple GUI to download snark artifacts | - Simplicity.<br>- Convenience.<br>                                                                                     |                                                           |

### GitHub/Git

GitHub/Git are used for the detailed management of the artifact repository, offering advantages like [sparse-checkout](https://git-scm.com/docs/git-sparse-checkout). This feature is particularly useful for developers needing access to a subset of artifacts, reducing the footprint and speeding up the local setup and development process.

### npm

npm is central to this solution, serving not only for version control and distribution but also for ensuring the integrity of the artifacts. After artifacts are fetched from a CDN, the integrity of these packages can be verified using NPM's built-in capabilities such as npm audit and signature verifications. This adds an essential layer of security, ensuring that the downloaded artifacts have not been tampered with and are exactly as published. It's a vital step for cryptographic artifacts where integrity is paramount.

The npm packages will be part of the `@zk-kit` npm org and will have the following format: `@zk-kit/{project}-artifacts`.

#### Versioning

Artifacts packages are released either as major or beta versions.\
Only major releases contain artifacts generated with genuine trusted setup (see [ceremony.pse.dev](https://ceremony.pse.dev)).\
Beta releases contain artifacts generated with dummy setups and should therefore **not be trusted to generate proofs in production environments or sensitive applications**.

#### Relationship with source circuits files

| source circuits are packaged |   artifacts package version    |             custom `circuit` field in `package.json`              |                                                                                        ex                                                                                         |
| :--------------------------: | :----------------------------: | :---------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|             yes              | should match circuits' version |               must be set to circuits package name                | [`@zk-kit/semaphore-artifacts`](https://github.com/privacy-scaling-explorations/snark-artifacts/blob/ca28f5b708c8df970239642db341753bca716166/packages/semaphore/package.json#L4) |
|              no              |      has its own version       | must be set to the remote commit sha url referring to the circuit |                                                                                                                                                                                   |

### Content Delivery Network (CDN)

We use [CloudFront](https://aws.amazon.com/de/cloudfront), a Content Delivery Network (CDN), to deliver content stored as static files on an [S3](https://aws.amazon.com/s3) instance. CDNs provide a layer for the npm packages, enabling fast and reliable access to artifacts worldwide. This service allows projects to use artifacts without including them directly in their build, optimizing download times and minimizing bandwidth usage. Despite being a centralized distribution method, it offers unparalleled ease of access to the necessary files.

### Web Application

The [snark-artifacts.pse.dev](https://snark-artifacts.pse.dev) web application provides a simple interface for users to download specific version of any artifacts supported by this project without requiring technical knowledge.

## Conclusion

In summary, this approach leverages the strengths of each platform to address the distribution, version control, and security of SNARK artifacts. GitHub/Git enhances repository management and selective access for developers, NPM ensures artifact integrity and manages versions, and CDNs facilitate fast, global distribution. This strategy effectively meets the challenges of managing relatively large, frequently updated cryptographic artifacts in a secure and efficient manner.
