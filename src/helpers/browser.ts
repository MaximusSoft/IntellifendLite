import { BrowserCore, Browser } from '../enums'
import { IntellifendError } from '../types'
import { countTruthy } from './common'
import { strIncludes } from './polyfills'

export function evaluateBrowserCore(): BrowserCore {
  const w = window
  const n = navigator

  if (
    countTruthy([
      'webkitPersistentStorage' in n,
      'webkitTemporaryStorage' in n,
      n.vendor.indexOf('Google') === 0,
      'webkitResolveLocalFileSystemURL' in w,
      'BatteryManager' in w,
      'webkitMediaStream' in w,
      'webkitSpeechGrammar' in w,
    ]) >= 5
  ) {
    return BrowserCore.Chromium
  }

  if (
    countTruthy([
      'ApplePayError' in w,
      'CSSPrimitiveValue' in w,
      'Counter' in w,
      n.vendor.indexOf('Apple') === 0,
      'getStorageUpdates' in n,
      'WebKitMediaKeys' in w,
    ]) >= 4
  ) {
    return BrowserCore.Webkit
  }

  if (
    countTruthy([
      'buildID' in navigator,
      'MozAppearance' in (document.documentElement?.style ?? {}),
      'onmozfullscreenchange' in w,
      'mozInnerScreenX' in w,
      'CSSMozDocumentRule' in w,
      'CanvasCaptureMediaStream' in w,
    ]) >= 4
  ) {
    return BrowserCore.Gecko
  }

  return BrowserCore.Unknown
}

export function evaluateBrowser(): Browser {
  const userAgent = navigator.userAgent?.toLowerCase()
  if (strIncludes(userAgent, 'wechat')) {
    return Browser.WeChat
  } else if (strIncludes(userAgent, 'firefox')) {
    return Browser.Firefox
  } else if (strIncludes(userAgent, 'opera') || strIncludes(userAgent, 'opr')) {
    return Browser.Opera
  } else if (strIncludes(userAgent, 'chrome')) {
    return Browser.Chrome
  } else if (strIncludes(userAgent, 'safari')) {
    return Browser.Safari
  } else if (strIncludes(userAgent, 'trident') || strIncludes(userAgent, 'msie')) {
    return Browser.IE
  } else {
    return Browser.Unknown
  }
}

export function isAndroid(): boolean {
  const browserEngineKind = evaluateBrowserCore()
  const isItChromium = browserEngineKind === BrowserCore.Chromium
  const isItGecko = browserEngineKind === BrowserCore.Gecko

  if (!isItChromium && !isItGecko) return false

  const w = window

  return (
    countTruthy([
      'onorientationchange' in w,
      'orientation' in w,
      isItChromium && !('SharedWorker' in w),
      isItGecko && /android/i.test(navigator.appVersion),
    ]) >= 2
  )
}

export function isDesktopSafari(): boolean {
  if (evaluateBrowserCore() !== BrowserCore.Webkit) {
    return false
  }
  const w = window
  return (
    countTruthy([
      'safari' in w, // false where in Karma and BrowserStack Automate
      !('DeviceMotionEvent' in w),
      !('ongestureend' in w),
      !('standalone' in navigator),
    ]) >= 3
  )
}

export function getMozAppearanceSupport(): boolean {
  if (window.CSS === undefined) {
    throw new IntellifendError('window.CSS is undefined')
  }
  return CSS.supports('-moz-appearance', 'auto')
}

export function getDocumentFocus(): boolean {
  if (document.hasFocus === undefined) {
    return false
  }
  return document.hasFocus()
}