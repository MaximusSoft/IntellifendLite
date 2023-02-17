import { Anomaly, BotRuntime } from '../../enums'
import { Checker } from '../../types'

export const checkPhantomjsFunctionBind: Checker = {
    anomaly: Anomaly.NoFunctionBind,
    handler: ({ log }) => {
        log.trace(BotRuntime.PhantomJS, 'function_bind', `navigator.userAgent contains "headless"`)
    
        return Function.prototype.bind === undefined
    }
}