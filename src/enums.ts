/**
 * Enum for types of bot runtimes.
 *
 * @readonly
 * @enum {string}
 */
export const enum BotRuntime {
  Uncategorized = 'uncategorized',
  HeadlessChrome = 'headless_chrome',
  PhantomJS = 'phantomjs',
  Nightmare = 'nightmare',
  Selenium = 'selenium',
  Electron = 'electron',
  Rhino = 'rhino',
  CouchJS = 'couchjs',
  Sequentum = 'sequentum',
  SlimerJS = 'slimerjs',
  CefSharp = 'cefsharp',
}
/**
 * Enum for types of anomalies.
 *
 * @readonly
 * @enum {int}
 */
export const enum Anomaly {
  EmptyPlugins = 'empty_plugins',
  NoFunctionBind = 'no_function_bind',
  HeadlessUserAgent = 'headless_user_agent',
  ElectronUserAgent = 'electron_user_agent',
  SlimerjsUserAgent = 'slimerjs_user_agent',
  MimeTypesInconsistent = 'mime_types_inconsistent',
}

export const enum BrowserCore {
  Unknown = 'unknown',
  Chromium = 'chromium',
  Gecko = 'gecko',
  Webkit = 'webkit',
}

export const enum Browser {
  Unknown = 'unknown',
  Chrome = 'chrome',
  Firefox = 'firefox',
  Opera = 'opera',
  Safari = 'safari',
  WeChat = 'wechat',
  IE = 'ie',
}