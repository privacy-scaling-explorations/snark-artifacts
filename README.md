# Snark Artifacts
<p align="center">
  <a href="https://www.npmjs.com/package/@zk-kit/eddsa-artifacts">
    <img 
      alt="NPM eddsa"
      src="https://img.shields.io/npm/v/%40zk-kit%2Feddsa-artifacts?logo=npm&label=%40zk-kit%2Feddsa-artifacts">
    </a>
  <a href="https://www.npmjs.com/package/@zk-kit/poseidon-artifacts">
    <img 
      alt="NPM poseidon"
      src="https://img.shields.io/npm/v/%40zk-kit%2Fposeidon-artifacts?logo=npm&label=%40zk-kit%2Fposeidon-artifacts">
  </a>
  <a href="https://www.npmjs.com/package/@zk-kit/semaphore-artifacts">
    <img 
      alt="NPM semaphore"
      src="https://img.shields.io/npm/v/%40zk-kit%2Fsemaphore-artifacts?logo=npm&label=%40zk-kit%2Fsemaphore-artifacts">
  </a>
</p>

Snark artifacts (`wasm` and `zkit`) npm packages especially for use in [zk-kit](https://github.com/privacy-scaling-explorations/zk-kit).  
We don't recommende using them as explicit npm dependenices in your project to avoid bloating it.  
Instead you should consider fetching them from [`unpkg.com`](https://unpkg.com/) (approach followed by [zk-kit](https://github.com/privacy-scaling-explorations/zk-kit)).  

### Scripts
- [download-artifacts-init](./download-artifacts-init): Initial artifacts download from [zkkit.cedoor.dev](https://zkkit.cedoor.dev) and [semaphore.cedoor.dev](https://semaphore.cedoor.dev) (see [download-artifacts-init](./download-artifacts-init)).
- [download-artifacts](./download-artifacts): download all artifacts from this repository/
  ```shell
  bash <(curl -sSL https://raw.githubusercontent.com/privacy-scaling-explorations/snark-artifacts/main/dowload-artifacts) -h
  ```
