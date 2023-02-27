import { BotRuntime, Anomaly } from '../enums'

export const AnomalyToRuntime = new Map<Anomaly, BotRuntime>([
  [Anomaly.HeadlessLanguagesLengthInconsistent, BotRuntime.HeadlessChrome],
  [Anomaly.HeadlessUserAgent, BotRuntime.HeadlessChrome],
  [Anomaly.ElectronUserAgent, BotRuntime.Electron],
  [Anomaly.SlimerjsUserAgent, BotRuntime.SlimerJS],
  [Anomaly.HeadlessAppVersion, BotRuntime.HeadlessChrome],
  [Anomaly.ElectronAppVersion, BotRuntime.Electron],
  [Anomaly.SlimerjsAppVersion, BotRuntime.SlimerJS],
  [Anomaly.PluginsArray, BotRuntime.HeadlessChrome],
  [Anomaly.PluginsInconsistent, BotRuntime.HeadlessChrome],
  [Anomaly.SeleniumDocumentAttributes, BotRuntime.Selenium],
  [Anomaly.SeleniumDocumentProperties, BotRuntime.Selenium],
  [Anomaly.NoFunctionBind, BotRuntime.PhantomJS],
  [Anomaly.PhantomjsErrorTrace, BotRuntime.PhantomJS],
  [Anomaly.MimeTypesInconsistent, BotRuntime.Uncategorized],
  [Anomaly.EvalLengthInconsistent, BotRuntime.Uncategorized],
  [Anomaly.NotificationPermissions, BotRuntime.HeadlessChrome],
  [Anomaly.ElectronProcess, BotRuntime.Electron],
  [Anomaly.ProductSub, BotRuntime.Uncategorized],
  [Anomaly.RTT, BotRuntime.HeadlessChrome],
  [Anomaly.WebDriver, BotRuntime.HeadlessChrome],
  [Anomaly.WebGL, BotRuntime.HeadlessChrome],
  [Anomaly.WindowExternal, BotRuntime.Sequentum],
  [Anomaly.HeadlessWindowProperties, BotRuntime.HeadlessChrome],
  [Anomaly.SeleniumWindowProperties, BotRuntime.Selenium],
  [Anomaly.PhantomjsWindowProperties, BotRuntime.PhantomJS],
  [Anomaly.NightmareWindowProperties, BotRuntime.Nightmare],
  [Anomaly.CouchjsWindowProperties, BotRuntime.CouchJS],
  [Anomaly.RhinoWindowProperties, BotRuntime.Rhino],
  [Anomaly.CefSharpWindowProperties, BotRuntime.CefSharp],
  [Anomaly.WindowSize, BotRuntime.HeadlessChrome],
])

export function runtimeOfAnomaly(anomaly: Anomaly): BotRuntime {
  return AnomalyToRuntime.get(anomaly) || BotRuntime.Uncategorized
}
