import { BotRuntime, Anomaly } from './enums'

export const AnomalyToRuntime = new Map<number, string>([
    [Anomaly.EmptyPlugins, BotRuntime.Selenium],
    [Anomaly.NoFunctionBind, BotRuntime.PhantomJS],
])

export function runtimeOfAnomaly(anomaly: Anomaly): BotRuntime {
  return AnomalyToRuntime[anomaly]
}