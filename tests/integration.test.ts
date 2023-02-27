import * as IntellifendLiteModule from '../src'

declare const IntellifendLite: typeof IntellifendLiteModule

describe('Integration', () => {
  it('performs bot evaluation', async () => {
    expect(IntellifendLite).toBeInstanceOf(Object)
    expect(typeof IntellifendLite.load).toBe('function')

    const evaluator = await IntellifendLite.load()
    expect(typeof evaluator).toBe('object')

    const instance = await IntellifendLite.load()
    expect(instance).toBeInstanceOf(Object)

    const detectionResult = await instance.evaluate()
    expect(detectionResult).toBeInstanceOf(Object)
    expect(typeof detectionResult.isBot).toBe('boolean')
    console.info("Is bot or not? - " + detectionResult.isBot)

  }, 10000)
})