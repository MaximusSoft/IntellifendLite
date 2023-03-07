import packageInfo from '../package.json'
import BotEvaluator from './evaluator'

/**
 * Options for IntellifendLite loading
 */
export interface LoadOptions {
  /**
   * Set `false` to disable the sending of usage statistics.
   */
  reporting?: boolean
}

/**
 * Sends an unpersonalized AJAX request to collect installation statistics
 */
function report() {
  try {
    const request = new XMLHttpRequest()
    request.open('get', `https://cdn.intellifend.com/lite/install-monitoring?v=${packageInfo.version}`, true)
    request.send()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }
}

export async function load({ reporting = false }: Readonly<LoadOptions> = {}): Promise<BotEvaluator> {
  if (reporting) {
    report()
  }
  const evaluator = new BotEvaluator()
  return evaluator
}

export default { load }

/** non official api */
export { BotEvaluator }
