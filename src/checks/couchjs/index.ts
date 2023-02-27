import { Anomaly, BotRuntime } from '../../enums'
import { getObjectProps, includes } from '../../helpers/common'
import { Checker } from '../../types'

export const checkCouchjsWindowProperties: Checker = {
  anomaly: Anomaly.CouchjsWindowProperties,
  handler: async ({ log }) => {
    const windowProps = getObjectProps(window)
    const contains = includes(windowProps, 'emit')
    log.trace(BotRuntime.CouchJS, 'couchjs_window_properties', `window properties must not contain 'emit': ${contains}`)
    return contains
  },
}
