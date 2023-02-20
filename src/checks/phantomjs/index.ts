import { Anomaly, BotRuntime } from '../../enums'
import { getObjectProps, includes } from '../../helpers/common'
import { Checker } from '../../types'

export const checkPhantomjsFunctionBind: Checker = {
    anomaly: Anomaly.NoFunctionBind,
    handler: async ({ log }) => {
        log.trace(BotRuntime.PhantomJS, 'function_bind', `Property Function.prototype.bind is underfined`)

        return Function.prototype.bind === undefined
    }
}

export const checkPhantomjsUserAgent: Checker = {
    anomaly: Anomaly.PhantomjsUserAgent,
    handler: async ({ log }) => {
        const userAgent = navigator.userAgent
        log.trace(BotRuntime.PhantomJS, 'user_agent', `navigator.userAgent must not contains "PhantomJS": ${userAgent}`)

        return userAgent != undefined && /PhantomJS/i.test(userAgent)
    }
}

export const checkPhantomjsErrorTrace: Checker = {
    anomaly: Anomaly.PhantomjsErrorTrace,
    handler: async ({ log }) => {
        let errorTrace = null
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            null[0]()
        } catch (error) {
            if (error instanceof Error && error['stack'] != null) {
                errorTrace = error.stack.toString()
            }
        }
        log.trace(BotRuntime.PhantomJS, 'error_trace', `errorTrace signal unexpected behaviour: ${errorTrace}`)

        return errorTrace != null && /PhantomJS/i.test(errorTrace)
    }
}

export const checkPhantomjsWindowProperties: Checker = {
    anomaly: Anomaly.PhantomjsWindowProperties,
    handler: async ({ log }) => {
        const windowProps = getObjectProps(window)
        const contains = includes(windowProps, 'callPhantom', '_phantom')
        log.trace(BotRuntime.PhantomJS, 'phantomjs_window_properties', `window properties must not contain 'callPhantom', '_phantom': ${contains}`)
        return contains
    }
}