export enum Project {
  POSEIDON = 'poseidon',
  // RLN = 'rln',
  SEMAPHORE = 'semaphore',
  SEMAPHORE_IDENTITY = 'semaphore-identity',
}

export const projects = Object.values(Project).sort()

export async function getAvailableVersions(project: Project) {
  const res = await fetch(`https://registry.npmjs.org/@zk-kit/${project}-artifacts`)
  const { versions } = await res.json()
  return Object.keys(versions)
}
