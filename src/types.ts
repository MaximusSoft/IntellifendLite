import { Anomaly, BotRuntime, Browser, BrowserCore } from './enums'

export type Trace = string

export type CheckResult = {
    violated: Boolean,
    anomaly: Anomaly
}

export type EvaluationResult = {
    trace: string,
    checks: CheckResult[],
    bots: BotRuntime[],
}

export type Tracer = Array<Trace>

export type CheckerArguments = {
    log: LoggerInterface,
    browser: Browser,
    browserCore: BrowserCore,
}

export type Checker = {
    anomaly: Anomaly,
    handler: (_: CheckerArguments) => Boolean,
}

export interface LoggerInterface {
    trace(...message: string[]): void
    read(): string
}


// type CheckerHandler = (tracer: Tracer) => Boolean;

// export class Checker {
//     anomaly: Anomaly;
//     handler: CheckerHandler;
//     constructor(anomaly: Anomaly, handler: CheckerHandler) {
//         this.anomaly = anomaly
//         this.handler = handler
//     }
//     check(tracer: Tracer) {
//         try {
//             return this.handler(tracer)
//         } catch {
//             return
//         }
//     }
// }

export class IntellifendError extends Error {

}