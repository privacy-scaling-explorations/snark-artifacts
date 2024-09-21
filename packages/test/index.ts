import { Project } from '@zk-kit/artifacts'
import { generate, type PoseidonProof } from '@zk-kit/poseidon-proof'
import { unpackGroth16Proof } from '@zk-kit/utils'
import { keccak256, toBeHex } from 'ethers'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { groth16 } from 'snarkjs'
const SCOPE = 'scope'

const hash = (message: string) => (BigInt(keccak256(toBeHex(message, 32))) >> BigInt(8)).toString()

const generateProof = (project: Project) => async (preimages: number[]) => {
  const numParams = preimages.length

  return generate(preimages, SCOPE, {
    wasm: join(__dirname, '..', project, `${project}-${numParams}.wasm`),
    zkey: join(__dirname, '..', project, `${project}-${numParams}.zkey`),
  })
}

const verifyProof = (project: Project) =>
async (
  { digest, numberOfInputs, proof, scope }: PoseidonProof,
) => {
  const verifKey = JSON.parse(readFileSync(join(__dirname, '..', project, `${project}-${numberOfInputs}.json`), 'utf8'))
  return groth16.verify(verifKey, [digest, hash(scope)], unpackGroth16Proof(proof))
}

export const generatePoseidonProof = generateProof(Project.POSEIDON)
export const verifyPoseidonProof = verifyProof(Project.POSEIDON)
