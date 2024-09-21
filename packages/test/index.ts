import { Project } from '@zk-kit/artifacts'
import type { PoseidonProof } from '@zk-kit/poseidon-proof'
import { unpackGroth16Proof } from '@zk-kit/utils'
import { keccak256, toBeHex } from 'ethers'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { groth16 } from 'snarkjs'

export const SCOPE = 'scope'

const hash = (message: string) => (BigInt(keccak256(toBeHex(message, 32))) >> BigInt(8)).toString()

export const verifyPoseidonProof = (
  { digest, numberOfInputs, proof, scope }: PoseidonProof,
) => {
  const verifKey = JSON.parse(
    readFileSync(join(__dirname, '..', Project.POSEIDON, `${Project.POSEIDON}-${numberOfInputs}.json`), 'utf8'),
  )
  return groth16.verify(verifKey, [digest, hash(scope)], unpackGroth16Proof(proof))
}
