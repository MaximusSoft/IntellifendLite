const chromeIncognitoCapabilities = {
    'goog:chromeOptions': {
        args: ['--incognito'],
    },
}
const firefoxIncognitoCapabilities = {
    'moz:firefoxOptions': {
        prefs: {
            'browser.privatebrowsing.autostart': true,
        },
    },
}

const browserstackBrowsers = {
    IE11: { os: 'Windows', os_version: '7', browser: 'IE', browser_version: '11.0' },
    Windows11_EdgeLatest: { os: 'Windows', os_version: '11', browser: 'Edge', browser_version: 'latest-beta' },
    Windows10_Chrome49: { os: 'Windows', os_version: '10', browser: 'Chrome', browser_version: '49.0' },
    Windows11_ChromeLatest: { os: 'Windows', os_version: '11', browser: 'Chrome', browser_version: 'latest-beta' },
    Windows10_Firefox52: { os: 'Windows', os_version: '10', browser: 'Firefox', browser_version: '52.0' },
    Windows11_FirefoxLatest: { os: 'Windows', os_version: '11', browser: 'Firefox', browser_version: 'latest-beta' },
    Windows11_FirefoxLatest_Incognito: { os: 'Windows', os_version: '11', browser: 'Firefox', browser_version: 'latest-beta', ...firefoxIncognitoCapabilities },
    OSXMojave_Safari12: { os: 'OS X', os_version: 'Mojave', browser: 'Safari', browser_version: '12.1' },
    OSXMonterey_Safari15: { os: 'OS X', os_version: 'Monterey', browser: 'Safari', browser_version: '15.0' },
    OSXMonterey_ChromeLatest: { os: 'OS X', os_version: 'Monterey', browser: 'Chrome', browser_version: 'latest-beta' },
    OSXMonterey_ChromeLatest_Incognito: { os: 'OS X', os_version: 'Monterey', browser: 'Chrome', browser_version: 'latest-beta', ...chromeIncognitoCapabilities },
    OSXMonterey_FirefoxLatest: { os: 'OS X', os_version: 'Monterey', browser: 'Firefox', browser_version: 'latest-beta' },
    OSXMonterey_EdgeLatest: { os: 'OS X', os_version: 'Monterey', browser: 'Edge', browser_version: 'latest-beta' },
    Android11_ChromeLatest: { device: 'Google Pixel 4', os: 'Android', os_version: '11.0', browser: 'Chrome', browser_version: 'latest-beta' },
    iOS10_Safari: { device: 'iPhone 7', os: 'iOS', os_version: '10', browser: 'Safari' },
    iOS11_Safari: { device: 'iPhone 8 Plus', os: 'iOS', os_version: '11', browser: 'Safari' },
    iOS12_Safari: { device: 'iPhone XS', os: 'iOS', os_version: '12', browser: 'Safari' },
    iOS13_Safari: { device: 'iPhone 11 Pro', os: 'iOS', os_version: '13', browser: 'Safari' },
    iOS14_Safari: { device: 'iPhone 11', os: 'iOS', os_version: '14', browser: 'Safari' },
}
/* eslint-enable max-len */

function makeBuildNumber() {
    return `no-ci-${Math.floor(Math.random() * 1e10)}`
}

function setupLocal(config) {
    config.set({
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            'node_modules/promise-polyfill/dist/polyfill.js',

            'src/**/*.ts',
            'tests/**/*.ts',
            'test-dist/intellifendlite.min.js',
        ],
        preprocessors: {
            '**/*.ts': 'karma-typescript',
        },
        reporters: ['spec', 'summary'],
        browsers: ['ChromeHeadless', 'FirefoxHeadless'],
        concurrency: 2,

        karmaTypescriptConfig: {
            compilerOptions: {
                ...require('./tsconfig.json').compilerOptions,
                module: 'commonjs',
                sourceMap: true,
            },
        },

        specReporter: {
            suppressSummary: true,
            suppressErrorSummary: true,
            suppressPassed: true,
            suppressSkipped: true,
        },

        summaryReporter: {
            show: 'skipped', // To know that some tests are skipped exactly where they are supposed to be skipped
        },
    })
}

function setupBrowserstack(config) {
    setupLocal(config)

    const customLaunchers = {}
    for (const [key, data] of Object.entries(browserstackBrowsers)) {
        customLaunchers[key] = {
            base: 'BrowserStack',
            name: key.replace(/_/g, ' '),
            ...data,
        }
    }

    config.set({
        reporters: [...config.reporters, 'BrowserStack'],
        browsers: Object.keys(customLaunchers),
        customLaunchers,
        concurrency: 5,
        failOnEmptyTestSuite: false,

        browserStack: {
            project: 'IntellifendLite',
            build: process.env.GITHUB_RUN_ID || makeBuildNumber(),
            timeout: 120,
        },
    })
}

/**
 * Add `--target local` or `--target browserstack` to the Karma command to choose where to run the tests.
 */
module.exports = (config) => {
    switch (config.target) {
        case 'local':
            return setupLocal(config)
        case 'browserstack':
            return setupBrowserstack(config)
        default:
            throw new Error('No --target option is set or an unknown value is set')
    }
}