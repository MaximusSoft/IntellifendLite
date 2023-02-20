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
    PluginsArray = 'plugins_array',
    NoFunctionBind = 'no_function_bind',
    PhantomjsUserAgent = 'phantomjs_user_agent',
    PhantomjsErrorTrace = 'phantomjs_error_trace',
    HeadlessUserAgent = 'headless_user_agent',
    HeadlessAppVersion = 'headless_app_version',
    HeadlessLanguagesLengthInconsistent = "headless_languages_length_inconsistent",
    PluginsInconsistent = "plugins_inconsistent",
    ElectronUserAgent = 'electron_user_agent',
    ElectronAppVersion = 'electron_app_version',
    SlimerjsUserAgent = 'slimerjs_user_agent',
    SlimerjsAppVersion = 'slimerjs_app_version',
    SeleniumDocumentAttributes = 'selenium_document_attributes',
    SeleniumDocumentProperties = 'selenium_document_properties',
    MimeTypesInconsistent = 'mime_types_inconsistent',
    EvalLengthInconsistent = 'eval_length_inconsistency',
    NotificationPermissions = "notification_permissions",
    ElectronProcess = "electron_process",
    ProductSub = "product_sub",
    RTT = "rtt",
    WebDriver = "web_driver",
    WebGL = "webgl",
    WindowExternal = "window_external",
    HeadlessWindowProperties = "headless_window_properties",
    SeleniumWindowProperties = "selenium_window_properties",
    PhantomjsWindowProperties = "phantomjs_window_properties",
    NightmareWindowProperties = "nightmare_window_properties",
    CouchjsWindowProperties = "couchjs_window_properties",
    RhinoWindowProperties = "rhino_window_properties",
    CefSharpWindowProperties = "cefsharp_window_properties",
    WindowSize = "window_size",
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