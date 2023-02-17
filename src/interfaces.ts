import { Checker, EvaluationResult } from "./types";

export interface BotEvaluatorInterface {
    evaluate(): Promise<EvaluationResult>
    getCheckers(): Array<Checker>
  }