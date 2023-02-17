import { LoggerInterface } from "../types";

export class JsonLogger implements LoggerInterface {
    tree: Map<string, Map<string, string[]>> = new Map<string, Map<string, string[]>>()
    trace(botLabel: string, checkLabel: string, message: string) {
        this.tree.set(botLabel, this.tree.get(botLabel) || new Map<string, string[]>())
        const checkLabels = this.tree.get(botLabel)!
        checkLabels.set(checkLabel, checkLabels.get(checkLabel) || [])
        const messages = checkLabels.get(checkLabel)!
        messages.push(message)
    }
    read(): string {
        return JSON.stringify(this.tree)
    }
}