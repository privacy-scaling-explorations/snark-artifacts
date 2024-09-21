import { generatePoseidonProof, verifyPoseidonProof } from '@zk-kit/test'
import { getCurveFromName } from 'ffjavascript'

const INPUTS = Array.from({ length: 16 }, (_, i) => i + 1).map(i => ({
  inputs: Array.from({ length: i }, (_, j) => j + 1),
  numberOfInputs: i,
}))

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
    async ({ inputs }) => {
      const proof = await generatePoseidonProof(inputs)
      const result = await verifyPoseidonProof(proof)
      expect(result).toBe(true)
    },
  )
})
