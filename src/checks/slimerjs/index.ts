import { Anomaly, BotRuntime } from '../../enums'
import { Checker } from '../../types'

export const checkSlimerjsUserAgent: Checker = {
    anomaly: Anomaly.SlimerjsUserAgent,
    handler: ({ log }) => {
        const userAgent = navigator.userAgent
        log.trace(BotRuntime.SlimerJS, 'user_agent', `navigator.userAgent contains "slimerjs": ${userAgent}`)
    
        return userAgent != undefined && /slimerjs/i.test(userAgent)
    }
}