import { Anomaly, BotRuntime, Browser, BrowserCore } from '../../enums'
import { getDocumentFocus, isAndroid, isChromium86OrNewer, isDesktopSafari } from '../../helpers/browser'
import { getObjectProps, includes } from '../../helpers/common'
import { Checker } from '../../types'

export const checkHeadlessAppVersion: Checker = {
  anomaly: Anomaly.HeadlessAppVersion,
  handler: async ({ log }) => {
    const appVersion = navigator.appVersion
    log.trace(
      BotRuntime.HeadlessChrome,
      'app_version',
      `navigator.appVersion must not contains "headless": ${appVersion}`,
    )

    return appVersion != undefined && /headless/i.test(appVersion)
  },
}

export const checkHeadlessChromeUserAgent: Checker = {
  anomaly: Anomaly.HeadlessUserAgent,
  handler: async ({ log }) => {
    const userAgent = navigator.userAgent
    log.trace(BotRuntime.HeadlessChrome, 'user_agent', `navigator.userAgent must not contains "Headless": ${userAgent}`)

    return userAgent != undefined && /Headless/i.test(userAgent)
  },
}

export const checkHeadlessLanguagesLengthInconsistent: Checker = {
  anomaly: Anomaly.HeadlessLanguagesLengthInconsistent,
  handler: async ({ log, browserCore }) => {
    const languages: string[][] = []

    const language =
      navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage
    if (language !== undefined) {
      languages.push([language])
    }

    if (Array.isArray(navigator.languages)) {
      if (!(browserCore === BrowserCore.Chromium && isChromium86OrNewer())) {
        languages.push(navigator.languages)
      }
    } else if (typeof navigator.languages === 'string') {
      const languagesStr = navigator.languages as string
      if (languagesStr) {
        languages.push(languagesStr.split(','))
      }
    }

    log.trace(
      BotRuntime.HeadlessChrome,
      'languages_length_inconsistent',
      `navigator.languages must contain an value: ${JSON.stringify(languages)}`,
    )
    return languages.length == 0
  },
}

export const checkNotificationPermissions: Checker = {
  anomaly: Anomaly.NotificationPermissions,
  handler: async ({ log, browser }) => {
    if (browser != Browser.Chrome) {
      log.trace(BotRuntime.HeadlessChrome, 'notification_permissions', `browser is not Chrome`)
      return false
    }

    if (window.Notification === undefined) {
      log.trace(BotRuntime.HeadlessChrome, 'notification_permissions', `window.Notification is undefined`)
      return false
    }
    if (navigator.permissions === undefined) {
      log.trace(BotRuntime.HeadlessChrome, 'notification_permissions', `navigator.permissions is undefined`)
      return false
    }
    const { permissions } = navigator
    if (typeof permissions.query !== 'function') {
      log.trace(BotRuntime.HeadlessChrome, 'notification_permissions', `navigator.permissions.query is not a function`)
      return false
    }
    try {
      const permissionStatus = await permissions.query({ name: 'notifications' })
      log.trace(
        BotRuntime.HeadlessChrome,
        'notification_permissions',
        `permissionStatus must not be prompt: ${JSON.stringify(permissionStatus)}`,
      )
      return window.Notification.permission === 'denied' && permissionStatus.state === 'prompt'
    } catch (e) {
      log.trace(
        BotRuntime.HeadlessChrome,
        'notification_permissions',
        `notificationPermissions signal unexpected behaviour`,
      )
      return false
    }
  },
}

export const checkHeadlessWindowProperties: Checker = {
  anomaly: Anomaly.HeadlessWindowProperties,
  handler: async ({ log }) => {
    const windowProps = getObjectProps(window)
    const contains = includes(windowProps, 'webdriver', 'domAutomation', 'domAutomationController')
    log.trace(
      BotRuntime.HeadlessChrome,
      'headless_window_properties',
      `window properties must not contain "webdriver", "domAutomation", "domAutomationController": ${contains}`,
    )
    return contains
  },
}

export const checkHeadlessPluginsArray: Checker = {
  anomaly: Anomaly.PluginsArray,
  handler: async ({ log }) => {
    if (navigator.plugins === undefined) {
      log.trace(BotRuntime.HeadlessChrome, 'plugins_array', `navigator.plugins is undefined`)
      return false
    }
    if (window.PluginArray === undefined) {
      log.trace(BotRuntime.HeadlessChrome, 'plugins_array', `window.PluginArray is undefined`)
      return false
    }
    log.trace(BotRuntime.HeadlessChrome, 'plugins_array', `type of navigator.plugins must be PluginArray`)
    return !(navigator.plugins instanceof PluginArray)
  },
}

export const checkHeadlessPluginsInconsistent: Checker = {
  anomaly: Anomaly.PluginsInconsistent,
  handler: async ({ log, browserCore }) => {
    if (navigator.plugins === undefined) {
      log.trace(BotRuntime.HeadlessChrome, 'plugins_inconsistent', `navigator.plugins is undefined`)
      return false
    }
    const pluginsLength = navigator.plugins.length

    if (
      (browserCore === BrowserCore.Chromium && isAndroid()) ||
      (browserCore === BrowserCore.Webkit && !isDesktopSafari())
    ) {
      log.trace(
        BotRuntime.HeadlessChrome,
        'plugins_inconsistent',
        `browserCore is Chromium in Android; or Webkit in iOS`,
      )
      return false
    }
    return pluginsLength === 0
  },
}

// export const checkHeadlessRTT: Checker = {
//     anomaly: Anomaly.RTT,
//     handler: async ({ log }) => {
//         if (navigator.connection === undefined) {
//             log.trace(BotRuntime.HeadlessChrome, 'rtt', `navigator.connection is undefined`)
//             return false
//         }
//         if (navigator.connection.rtt === undefined) {
//             log.trace(BotRuntime.HeadlessChrome, 'rtt', `navigator.connection.rtt is undefined`)
//             return false
//         }

//         if (isAndroid()) {
//             log.trace(BotRuntime.HeadlessChrome, 'rtt', `is Android`)
//             return false
//         }
//         log.trace(BotRuntime.HeadlessChrome, 'rtt', `navigator.connection.rtt must not be 0: ${navigator.connection.rtt}`)
//         return (navigator.connection.rtt === 0)
//     }
// }

export const checkWebDriver: Checker = {
  anomaly: Anomaly.WebDriver,
  handler: async ({ log }) => {
    if (navigator.webdriver == undefined) {
      log.trace(BotRuntime.HeadlessChrome, 'web_driver', `navigator.webdriver is undefined`)
    }
    log.trace(BotRuntime.HeadlessChrome, 'web_driver', `navigator.webdriver must be undefined: ${navigator.webdriver}`)
    return navigator.webdriver != null && navigator.webdriver != undefined && navigator.webdriver != false
  },
}

export const checkWindowSize: Checker = {
  anomaly: Anomaly.WindowSize,
  handler: async ({ log }) => {
    const sizes = {
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    }

    if (!getDocumentFocus()) {
      log.trace(BotRuntime.HeadlessChrome, 'window_size', `document.hasFocus is undefined or returns false`)
      return false
    }
    log.trace(BotRuntime.HeadlessChrome, 'window_size', `window.outerWidth or sizes.outerHeight must not be 0`)

    return sizes.outerWidth === 0 && sizes.outerHeight === 0
  },
}

export const checkWeGL: Checker = {
  anomaly: Anomaly.WebGL,
  handler: async ({ log }) => {
    const canvasElement = document.createElement('canvas')

    if (typeof canvasElement.getContext !== 'function') {
      log.trace(BotRuntime.HeadlessChrome, 'webgl', `HTMLCanvasElement.getContext is not a function`)
      return false
    }

    const webGLContext = canvasElement.getContext('webgl')

    if (webGLContext === null) {
      log.trace(BotRuntime.HeadlessChrome, 'webgl', `WebGLRenderingContext is null`)
      return false
    }

    if (typeof webGLContext.getParameter !== 'function') {
      log.trace(BotRuntime.HeadlessChrome, 'webgl', `WebGLRenderingContext.getParameter is not a function`)
      return false
    }

    const vendor = webGLContext.getParameter(webGLContext.VENDOR)
    const renderer = webGLContext.getParameter(webGLContext.RENDERER)

    log.trace(
      BotRuntime.HeadlessChrome,
      'webgl',
      `WebGLRenderingContext.Parameters{VENDOR,RENDERER} must not be {"Brian Paul","Mesa OffScreen"}: ${vendor}, ${renderer}`,
    )
    return vendor == 'Brian Paul' && renderer == 'Mesa OffScreen'
  },
}
