import { Anomaly, BotRuntime, Browser, BrowserCore } from '../../enums'
import { arrayIncludes } from '../../helpers/polyfills'
import { Checker } from '../../types'

export const checkUncategorizedMimeTypesInconsistent: Checker = {
    anomaly: Anomaly.MimeTypesInconsistent,
    handler: async ({ log }) => {
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

        log.trace(BotRuntime.Uncategorized, 'mime_types_inconsistent', `navigator.mimeTypes data type is inconsistent: ${isConsistent}`)

        return isConsistent == false
    }
}


export const checkUncategorizedEvalLengthInconsistent: Checker = {
    anomaly: Anomaly.EvalLengthInconsistent,
    handler: async ({ log, browser, browserCore }) => {
        let evalLength = null
        try {
            evalLength = eval.toString().length
        } catch {
        }
        log.trace(BotRuntime.Uncategorized, 'eval_length_inconsistent', `eval.toString().length is inconsistent: ${evalLength}`)

        return (
            (length === 37 && !arrayIncludes([BrowserCore.Webkit, BrowserCore.Gecko], browserCore)) ||
            (length === 39 && !arrayIncludes([Browser.IE], browser)) ||
            (length === 33 && !arrayIncludes([BrowserCore.Chromium], browserCore))
        )
    }
}


export const checkProductSub: Checker = {
    anomaly: Anomaly.ProductSub,
    handler: async ({ log, browser }) => {
        const { productSub } = navigator
        if (productSub === undefined) {
            log.trace(BotRuntime.Uncategorized, 'product_sub', `navigator.productSub is undefined`)
            return false
        }

        log.trace(BotRuntime.Uncategorized, 'product_sub', `navigator.productSub must not be "20030107": ${productSub}`)
        return (
            (browser === Browser.Chrome ||
                browser === Browser.Safari ||
                browser === Browser.Opera ||
                browser === Browser.WeChat) &&
            productSub !== '20030107'
        )
    }
}