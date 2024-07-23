import { generate } from '@zk-kit/poseidon-proof'
import { unpackGroth16Proof } from '@zk-kit/utils/proof-packing'
import { keccak256 } from 'ethers/crypto'
import { toBeHex } from 'ethers/utils'
import { getCurveFromName } from 'ffjavascript'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { after, before, describe, it } from 'node:test'
import * as poseidons from 'poseidon-lite'
import { groth16 } from 'snarkjs'

function hash(message) {
  return (BigInt(keccak256(toBeHex(message, 32))) >> BigInt(8)).toString()
}

const PWD = dirname(import.meta.url.replace('file://', ''))
const SCOPE = 'scope'
const INPUTS = Array.from({ length: 16 }, (_, i) => i + 1).map(i => Array.from({ length: i }, (_, j) => j + 1))

async function generateProof(inputs) {
  const numParams = inputs.length

  return generate(inputs, SCOPE, {
    wasm: join(PWD, `poseidon-${numParams}.wasm`),
    zkey: join(PWD, `poseidon-${numParams}.zkey`),
  })
}

async function verifyProof({ digest, numberOfInputs, proof, scope }) {
  const verifKey = JSON.parse(readFileSync(join(PWD, `poseidon-${numberOfInputs}.json`)))
  return groth16.verify(verifKey, [digest, hash(scope)], unpackGroth16Proof(proof))
}

describe('poseidon', () => {
  const scope = 'scope'
  let curve
  let digest
  const proofs = []

  before(async () => {
    curve = await getCurveFromName('bn128')

    for (const inputs of INPUTS) {
      const proof = await generateProof(inputs)
      proofs.push(proof)
    }
  }, 30_000)

  after(async () => {
    await curve.terminate()
  })

  it('Should verify a Poseidon proof', async () => {
    const errors = []

    for (const proof of proofs) {
      const result = await verifyProof(proof)
      try {
        assert.strictEqual(result, true, `proof verification failed for ${proof.numberOfInputs}`)
      } catch (error) {
        errors.push(error)
      }
    }

    if (errors.length > 0)
      throw new Error(errors.map(error => error.message).join('\n'))
  })
})
