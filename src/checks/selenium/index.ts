import { Anomaly, BotRuntime } from '../../enums'
import { getObjectProps, includes } from '../../helpers/common'
import { Checker } from '../../types'

export const checkSeleniumDocumentAttributes: Checker = {
    anomaly: Anomaly.SeleniumDocumentAttributes,
    handler: async ({ log }) => {

        if (document.documentElement === undefined) {
            log.trace(BotRuntime.Selenium, 'document_attributes', `document.documentElement is undefined`)
            return false
        }
        const { documentElement } = document
        if (typeof documentElement.getAttributeNames !== 'function') {
            log.trace(BotRuntime.Selenium, 'document_attributes', `document.documentElement.getAttributeNames is not a function`)
            return false
        }

        log.trace(BotRuntime.Selenium, 'document_attributes', `document.documentElement.getAttributeNames must contains "selenium": ${JSON.stringify(documentElement.getAttributeNames())}`)
        return (includes(documentElement.getAttributeNames(), 'selenium', 'webdriver', 'driver'))
    }
}


export const checkSeleniumDocumentProperties: Checker = {
    anomaly: Anomaly.SeleniumDocumentProperties,
    handler: async ({ log }) => {
        if (window.document === undefined) {
            log.trace(BotRuntime.Selenium, 'document_properties', `window.document is undefined`)
            return false
        }
        const documentProps = getObjectProps(window.document)

        log.trace(BotRuntime.Selenium, 'document_properties', `window.document must contains "selenium": ${JSON.stringify(documentProps)}`)
        return includes(
            documentProps,
            'selenium',
            '__fxdriver_unwrapped',
            '__selenium_unwrapped',
            '__webdriver_evaluate',
            '__driver_evaluate',
            '__webdriver_unwrapped',
            '__driver_unwrapped',
            '__selenium_evaluate',
            '__webdriver_script_function',
            '__webdriver_script_func',
            '__webdriver_script_fn',
            '__fxdriver_evaluate',
            '__webdriverFunc',
            '$chrome_asyncScriptInfo',
            '__$webdriverAsyncExecutor',
            '__lastWatirAlert',
            '__lastWatirConfirm',
            '__lastWatirPrompt',
            '_WEBDRIVER_ELEM_CACHE',
            'ChromeDriverw',
            'selenium-evaluate',
            '_Selenium_IDE_Recorder',
            /^([a-z]){3}_.*_(Array|Promise|Symbol)$/,
        )
    }
}

export const checkSeleniumWindowProperties: Checker = {
    anomaly: Anomaly.SeleniumWindowProperties,
    handler: async ({ log }) => {
        const windowProps = getObjectProps(window)
        const contains = includes(windowProps, '_selenium', '_Selenium_IDE_Recorder', 'callSelenium')
        log.trace(BotRuntime.Selenium, 'selenium_window_properties', `window properties must not contain '_selenium', '_Selenium_IDE_Recorder', 'callSelenium': ${contains}`)
        return contains
    }
}