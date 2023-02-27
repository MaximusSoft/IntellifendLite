import { Anomaly, BotRuntime, Browser, BrowserCore } from './enums'

export type Trace = string

export type CheckResult = {
  violated: boolean
  anomaly: Anomaly
}

export type EvaluationResult = {
  trace: string
  checks: CheckResult[]
  bots: BotRuntime[]
  isBot: boolean
}

export type Tracer = Array<Trace>

export type CheckerArguments = {
  log: LoggerInterface
  browser: Browser
  browserCore: BrowserCore
}

export type Checker = {
  anomaly: Anomaly
  handler: (_: CheckerArguments) => Promise<boolean>
}

export interface LoggerInterface {
  trace(...message: string[]): void
  read(): string
}

export class IntellifendError extends Error {}
