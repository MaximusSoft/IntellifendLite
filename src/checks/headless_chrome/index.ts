import { Anomaly, BotRuntime } from '../../enums'
import { Checker } from '../../types'

export const checkHeadlessChromeUserAgent: Checker = {
    anomaly: Anomaly.HeadlessUserAgent,
    handler: ({ log }) => {
        const userAgent = navigator.userAgent
        log.trace(BotRuntime.HeadlessChrome, 'user_agent', `navigator.userAgent contains "headless": ${userAgent}`)
    
        return userAgent != undefined && /headless/i.test(userAgent)
    }
}