import { generate, type PoseidonProof } from '@zk-kit/poseidon-proof'
import { unpackGroth16Proof } from '@zk-kit/utils'
import { keccak256 } from 'ethers/crypto'
import { toBeHex } from 'ethers/utils'
import { getCurveFromName } from 'ffjavascript'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { groth16 } from 'snarkjs'

const INPUTS = Array.from({ length: 16 }, (_, i) => i + 1).map(i => ({
  inputs: Array.from({ length: i }, (_, j) => j + 1),
  numberOfInputs: i,
}))
const SCOPE = 'scope'

const hash = (message: string) => (BigInt(keccak256(toBeHex(message, 32))) >> BigInt(8)).toString()

async function generateProof(preimages: number[]) {
  const numParams = preimages.length

  return generate(preimages, SCOPE, {
    wasm: join(__dirname, '..', `poseidon-${numParams}.wasm`),
    zkey: join(__dirname, '..', `poseidon-${numParams}.zkey`),
  })
}

async function verifyProof(
  { digest, numberOfInputs, proof, scope }: PoseidonProof,
) {
  const verifKey = JSON.parse(readFileSync(join(__dirname, '..', `poseidon-${numberOfInputs}.json`), 'utf8'))
  return groth16.verify(verifKey, [digest, hash(scope)], unpackGroth16Proof(proof))
}

describe('poseidon', () => {
  let curve: any

  beforeAll(async () => {
    curve = await getCurveFromName('bn128')
  }, 30_000)

  afterAll(async () => {
    await curve.terminate()
  })

  it.each(INPUTS)(
    'Should verify a poseidon proof with $numberOfInputs input(s)',
    async ({ inputs, numberOfInputs }) => {
      const s = `${numberOfInputs > 1 ? 's' : ''}`
      const proof = await generateProof(inputs)
      const result = await verifyProof(proof)
      assert.strictEqual(
        result,
        true,
        `Proof verification failed for ${numberOfInputs} parameter${s}`,
      )
    },
  )
})
