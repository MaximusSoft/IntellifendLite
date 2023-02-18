import { Anomaly, BotRuntime } from '../../enums'
import { Checker } from '../../types'

export const checkPhantomjsFunctionBind: Checker = {
    anomaly: Anomaly.NoFunctionBind,
    handler: ({ log }) => {
        log.trace(BotRuntime.PhantomJS, 'function_bind', `Property Function.prototype.bind is underfined`)
    
        return Function.prototype.bind === undefined
    }
}