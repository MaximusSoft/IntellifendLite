import { Anomaly, BotRuntime } from '../../enums'
import { Checker } from '../../types'

export const checkElectionAppVersion: Checker = {
  anomaly: Anomaly.ElectronAppVersion,
  handler: async ({ log }) => {
    const appVersion = navigator.appVersion
    log.trace(BotRuntime.Electron, 'app_version', `navigator.appVersion must not contains "electron": ${appVersion}`)

    return appVersion != undefined && /electron/i.test(appVersion)
  },
}

export const checkElectionUserAgent: Checker = {
  anomaly: Anomaly.ElectronUserAgent,
  handler: async ({ log }) => {
    const userAgent = navigator.userAgent
    log.trace(BotRuntime.Electron, 'user_agent', `navigator.userAgent must not contains "Electron": ${userAgent}`)

    return userAgent != undefined && /Electron/i.test(userAgent)
  },
}

export interface ProcessPayload {
  type?: string
  versions?: {
    electron?: string
  }
}

export const checkElectronProcess: Checker = {
  anomaly: Anomaly.ElectronProcess,
  handler: async ({ log }) => {
    if (window.process === undefined) {
      log.trace(BotRuntime.Electron, 'electron_process', `window.process is undefined`)
      return false
    }

    const process = <ProcessPayload>window.process

    log.trace(
      BotRuntime.Electron,
      'electron_process',
      `window.process.versions.electron must not be null: ${process.versions?.electron}`,
    )
    return process.type === 'renderer' || process.versions?.electron != null
  },
}
