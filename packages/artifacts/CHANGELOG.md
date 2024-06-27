# @zk-kit/artifacts

## 1.9.0

### Minor Changes

- [#109](https://github.com/privacy-scaling-explorations/snark-artifacts/pull/109) [`921d35a`](https://github.com/privacy-scaling-explorations/snark-artifacts/commit/921d35a341771069548afef6aa4d5fd3fdf19823) Thanks [@sripwoud](https://github.com/sripwoud)! - Sort values of `projects`

## 1.8.0

### Minor Changes

- [#103](https://github.com/privacy-scaling-explorations/snark-artifacts/pull/103) [`a0c2607`](https://github.com/privacy-scaling-explorations/snark-artifacts/commit/a0c260768370b2bd2d3cd922b7315c5ea57d8a9c) Thanks [@sripwoud](https://github.com/sripwoud)! - Do not check available versions prior to downloading artifacts

## 1.7.0

### Minor Changes

- [#97](https://github.com/privacy-scaling-explorations/snark-artifacts/pull/97) [`3f2bd6d`](https://github.com/privacy-scaling-explorations/snark-artifacts/commit/3f2bd6d2681c48e8b47ede788ca868a989890067) Thanks [@sripwoud](https://github.com/sripwoud)! - download artifacts from https://snark-artifacts.pse.dev

## 1.6.0

### Minor Changes

- [#84](https://github.com/privacy-scaling-explorations/snark-artifacts/pull/84) [`745cb46`](https://github.com/privacy-scaling-explorations/snark-artifacts/commit/745cb464ef74780a2af56366b8dc75c971a776ed) Thanks [@sripwoud](https://github.com/sripwoud)! - refactor: allow `string` as download arg instead of only `string[]`
  feat: export `maybeDownload`
  fix: update `package.json` entry points

## 1.5.1

### Patch Changes

- [#82](https://github.com/privacy-scaling-explorations/snark-artifacts/pull/82) [`4bfd1d4`](https://github.com/privacy-scaling-explorations/snark-artifacts/commit/4bfd1d449db61390c2dd8a5ff6d36b311dc83889) Thanks [@sripwoud](https://github.com/sripwoud)! - fix types export in package.json

## 1.5.0

### Minor Changes

- [#77](https://github.com/privacy-scaling-explorations/snark-artifacts/pull/77) [`f8630b3`](https://github.com/privacy-scaling-explorations/snark-artifacts/commit/f8630b3c26a1ed356dda8407f728135396907d49) Thanks [@sripwoud](https://github.com/sripwoud)! - refactor: export `download` from artifacts pkg for node envs

## 1.4.1

### Patch Changes

- [`171714d`](https://github.com/privacy-scaling-explorations/snark-artifacts/commit/171714d3ca0a2c40cef09e2c6555f0e025263d6f) Thanks [@sripwoud](https://github.com/sripwoud)! - fix: (re)include types definition in package

## 1.4.0

### Minor Changes

- [#69](https://github.com/privacy-scaling-explorations/snark-artifacts/pull/69) [`572c342`](https://github.com/privacy-scaling-explorations/snark-artifacts/commit/572c34206bbe23cf3c5a7277e156fb8dcb5734e2) Thanks [@sripwoud](https://github.com/sripwoud)! - feat: get available package versions

- [#66](https://github.com/privacy-scaling-explorations/snark-artifacts/pull/66) [`49ca18c`](https://github.com/privacy-scaling-explorations/snark-artifacts/commit/49ca18c07b970bcc0ccb108c80a855065ef72a8c) Thanks [@sripwoud](https://github.com/sripwoud)! - (re)Try fetching different artifacts cdns

## 1.3.2

### Patch Changes

- 6476dc0: New export fields

## 1.3.1

### Patch Changes

- 7ba2dc3: Export `SnarkArtifacts` and `Version` types

## 1.3.0

### Minor Changes

- 1a75840: Add `maybeGetSnarkArtitacts` functions (formerly in `@zk-kit/utils`)

## 1.1.0

### Minor changes

- 4023ed5: Update `Proof` enum (rename `EDDSA` variant to `SEMAPHORE_IDENTITY`)

## 1.0.0

### Major Changes

- 8ba6bbd: Define `Proof` enum
