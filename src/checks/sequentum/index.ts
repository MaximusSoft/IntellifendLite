import { Anomaly, BotRuntime } from '../../enums'
import { Checker } from '../../types'

export const checkWindowExternal: Checker = {
    anomaly: Anomaly.WindowExternal,
    handler: async ({ log }) => {
        if (window.external === undefined) {
            log.trace(BotRuntime.Sequentum, 'window_external', `window.external is undefined`)
            return false
        }
        const { external } = window
        if (typeof external.toString !== 'function') {
            log.trace(BotRuntime.Sequentum, 'window_external', `window.external.toString is not a function`)
            return false
        }

        log.trace(BotRuntime.Sequentum, 'window_external', `window.external.toString() must not contains "Sequentum": ${external.toString()}`)
        return (/Sequentum/i.test(external.toString()))
    }
}
