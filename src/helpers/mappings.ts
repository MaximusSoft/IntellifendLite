import { BotRuntime, Anomaly } from '../enums'

export const AnomalyToRuntime = new Map<number, BotRuntime>([
    [Anomaly.EmptyPlugins, BotRuntime.Selenium],
    [Anomaly.NoFunctionBind, BotRuntime.PhantomJS],
    [Anomaly.MimeTypesInconsistent, BotRuntime.Uncategorized],
])

export function runtimeOfAnomaly(anomaly: Anomaly): BotRuntime {
  return AnomalyToRuntime.get(anomaly)!
}