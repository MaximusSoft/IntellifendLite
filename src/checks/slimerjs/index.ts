import { Anomaly, BotRuntime } from '../../enums'
import { Checker } from '../../types'

export const checkSlimerjsAppVersion: Checker = {
  anomaly: Anomaly.SlimerjsAppVersion,
  handler: async ({ log }) => {
    const appVersion = navigator.appVersion
    log.trace(BotRuntime.SlimerJS, 'app_version', `navigator.appVersion must not contains "slimerjs": ${appVersion}`)

    return appVersion != undefined && /slimerjs/i.test(appVersion)
  },
}

export const checkSlimerjsUserAgent: Checker = {
  anomaly: Anomaly.SlimerjsUserAgent,
  handler: async ({ log }) => {
    const userAgent = navigator.userAgent
    log.trace(BotRuntime.SlimerJS, 'user_agent', `navigator.userAgent must not contains "slimerjs": ${userAgent}`)

    return userAgent != undefined && /slimerjs/i.test(userAgent)
  },
}
