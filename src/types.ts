import { Anomaly, BotRuntime } from './enums'

export type Trace = {
    name: string,
    value: any
}

export type AnomalyResult = {
    anomaly: Anomaly,
    traces: Array<Trace>
}

export type DetectionResult = {
    runtimes: Array<BotRuntime>,
    anomalies: Array<AnomalyResult>,
}