import { Checker, CheckerArguments, CheckResult, EvaluationResult } from './types'
import * as checkers from './checks'
import { BotEvaluatorInterface } from './interfaces'
import { JsonLogger } from './helpers/logging'
import { runtimeOfAnomaly } from './helpers/mappings'
import { BotRuntime } from './enums'
import { includes } from './helpers/common'
import { evaluateBrowser, evaluateBrowserCore } from './helpers/browser'

export default class BotEvaluator implements BotEvaluatorInterface {
  public async evaluate(): Promise<EvaluationResult> {
    const checkResults: CheckResult[] = []
    const checkerArguments: CheckerArguments = {
      log: new JsonLogger(),
      browser: evaluateBrowser(),
      browserCore: evaluateBrowserCore(),
    }

    for (const checker of this.getCheckers()) {
      try {
        checkResults.push({
          violated: checker.handler(checkerArguments),
          anomaly: checker.anomaly,
        })
      } catch(e) {
        console.error(e)
      }
    }
    const botRuntimes: BotRuntime[] = checkResults
      .filter(v => v.violated)
      .map(v => runtimeOfAnomaly(v.anomaly))
      .reduce((uniques: BotRuntime[], current: BotRuntime) => {
        if (!includes(uniques, current)) {
          uniques.push(current);
        }
        return uniques;
      }, [])

    const trace = checkerArguments.log.read()

    return {
      checks: checkResults,
      bots: botRuntimes,
      isBot: botRuntimes.length > 0,
      trace,
    }
  }
  getCheckers(): Checker[] {
    return Object.values(checkers)
  }
}