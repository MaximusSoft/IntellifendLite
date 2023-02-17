import { Anomaly, BotRuntime } from '../../enums'
import { Checker } from '../../types'

export const checkElectionUserAgent: Checker = {
    anomaly: Anomaly.ElectronUserAgent,
    handler: ({ log }) => {
        const userAgent = navigator.userAgent
        log.trace(BotRuntime.Electron, 'user_agent', `navigator.userAgent contains "electron": ${userAgent}`)
    
        return userAgent != undefined && /electron/i.test(userAgent)
    }
}