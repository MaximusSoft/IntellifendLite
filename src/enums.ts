/**
 * Enum for types of bot runtimes.
 *
 * @readonly
 * @enum {string}
 */
export const enum BotRuntime {
  Unknown = 'unknown',
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
  EmptyPlugins,
  NoFunctionBind,
}

// export type DetectionResponse = boolean | BotType | undefined

// /**
//  * Bot detection error.
//  */
// export class DetectionError extends Error {
//   state: Exclude<State, State.Success>

//   /**
//    * Creates a new DetectionError.
//    *
//    * @class
//    */
//   constructor(state: Exclude<State, State.Success>, message: string) {
//     super(message)
//     this.state = state
//     this.name = 'DetectionError'
//     Object.setPrototypeOf(this, DetectionError.prototype)
//   }
// }

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