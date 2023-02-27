import { Anomaly, BotRuntime } from '../../enums'
import { getObjectProps, includes } from '../../helpers/common'
import { Checker } from '../../types'

export const checkNightmareWindowProperties: Checker = {
  anomaly: Anomaly.NightmareWindowProperties,
  handler: async ({ log }) => {
    const windowProps = getObjectProps(window)
    const contains = includes(windowProps, '__nightmare')
    log.trace(
      BotRuntime.Nightmare,
      'nightmare_window_properties',
      `window properties must not contain '__nightmare': ${contains}`,
    )
    return contains
  },
}
