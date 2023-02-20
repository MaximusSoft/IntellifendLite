import { Anomaly, BotRuntime } from '../../enums'
import { getObjectProps, includes } from '../../helpers/common'
import { Checker } from '../../types'

export const checkRhinoWindowProperties: Checker = {
    anomaly: Anomaly.RhinoWindowProperties,
    handler: async ({ log }) => {
        const windowProps = getObjectProps(window)
        const contains = includes(windowProps, 'spawn')
        log.trace(BotRuntime.Rhino, 'rhino_window_properties', `window properties must not contain 'spawn': ${contains}`)
        return contains
    }
}