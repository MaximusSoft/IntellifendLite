import { BotRuntime, Anomaly } from '../enums'

export const AnomalyToRuntime = new Map<Anomaly, BotRuntime>([
    [Anomaly.HeadlessUserAgent, BotRuntime.HeadlessChrome],
    [Anomaly.ElectronUserAgent, BotRuntime.Electron],
    [Anomaly.SlimerjsUserAgent, BotRuntime.SlimerJS],
    [Anomaly.EmptyPlugins, BotRuntime.Selenium],
    [Anomaly.NoFunctionBind, BotRuntime.PhantomJS],
    [Anomaly.MimeTypesInconsistent, BotRuntime.Uncategorized],
])

export function runtimeOfAnomaly(anomaly: Anomaly): BotRuntime {
  return AnomalyToRuntime.get(anomaly) || BotRuntime.Uncategorized
}