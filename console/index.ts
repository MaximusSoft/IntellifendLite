import { load } from '../src'
import {
  evaluateBrowserCore,
  evaluateBrowser,
  getDocumentFocus,
  getMozAppearanceSupport,
  isAndroid,
  isDesktopSafari,
} from '../src/helpers/browser'
import './style.css'

interface Result {
  timeSpent: string
  detectionResult: Record<string, any>
}

const result: Result | undefined = undefined

const main = async () => {
  const statusElement = document.getElementById('status')
  const errorSectionElement = document.getElementById('error_section')
  const resultsSectionElement = document.getElementById('result_section')
  const errorElement = document.getElementById('error')
  const timeElement = document.getElementById('time-spent')
  const evaluationElement = document.getElementById('evaluation')
  const debugDataElement = document.getElementById('debug-data')
  const traceDataElement = document.getElementById('trace-data')

  statusElement!.textContent = 'Loading...'
  errorSectionElement!.style.display = 'none'
  resultsSectionElement!.style.display = 'none'

  try {
    const t0 = performance.now()

    const instance = await load()

    const evaluationResult = await instance.evaluate()
    const timeSpent = (performance.now() - t0).toFixed(0) + ' ms'

    errorSectionElement!.style.display = 'none'
    resultsSectionElement!.style.display = 'block'

    timeElement!.textContent = timeSpent

    evaluationElement!.textContent = JSON.stringify(
      {
        isBot: evaluationResult.isBot,
        botCategories: evaluationResult.bots,
        botAnomalies: evaluationResult.checks,
      },
      null,
      4,
    )

    const debugData = {
      browserCore: evaluateBrowserCore(),
      browser: evaluateBrowser(),
      documentFocus: getDocumentFocus(),
      mozAppearanceSupport: getMozAppearanceSupport(),
      isAndroid: isAndroid(),
      isDesktopSafari: isDesktopSafari(),
    }

    debugDataElement!.textContent = JSON.stringify(debugData, null, 4)
    traceDataElement!.textContent = evaluationResult.trace
    statusElement!.innerHTML =
      'Result: ' +
      (evaluationResult.isBot ? "<span class='red'>Bot detected</span>" : "<span class='green'>Normal</span>")
  } catch (e) {
    console.error(e)
    resultsSectionElement!.style.display = 'none'
    errorSectionElement!.style.display = 'block'
    statusElement!.textContent = 'Error!'
    errorElement!.textContent = JSON.stringify(e, Object.getOwnPropertyNames(e), 4)
  }
}

window.onload = async () => {
  document.getElementById('evaluate-button')!.addEventListener('click', main)

  document.getElementById('copy-trace-button')!.addEventListener('click', () => {
    navigator.clipboard.writeText(JSON.stringify(result)).then(() => {
      alert('Copied to clipboard')
    })
  })

  main()
}
