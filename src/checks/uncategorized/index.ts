import { Anomaly, BotRuntime } from '../../enums'
import { Checker } from '../../types'

export const checkUncategorizedMimeTypesInconsistent: Checker = {
    anomaly: Anomaly.MimeTypesInconsistent,
    handler: ({ log }) => {
        let isConsistent = null
        if (navigator.mimeTypes === undefined) {
            isConsistent = undefined
        } else {
            const { mimeTypes } = navigator
            isConsistent = Object.getPrototypeOf(mimeTypes) === MimeTypeArray.prototype
            for (let i = 0; i < mimeTypes.length; i++) {
                isConsistent &&= Object.getPrototypeOf(mimeTypes[i]) === MimeType.prototype
            }
        }
    
        log.trace(BotRuntime.Uncategorized, 'mime_types_inconsistent', `navigator.mimeTypes data type is inconsistent": ${isConsistent}`)
    
        return isConsistent == false
    }
}