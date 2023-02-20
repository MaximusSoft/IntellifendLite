import { Anomaly, BotRuntime } from '../../enums'
import { getObjectProps, includes } from '../../helpers/common'
import { Checker } from '../../types'

export const checkCefSharpWindowProperties: Checker = {
    anomaly: Anomaly.CefSharpWindowProperties,
    handler: async ({ log }) => {
        const windowProps = getObjectProps(window)
        const contains = includes(windowProps, 'CefSharp')
        log.trace(BotRuntime.CefSharp, 'cefsharp_window_properties', `window properties must not contain 'CefSharp': ${contains}`)
        return contains
    }
}