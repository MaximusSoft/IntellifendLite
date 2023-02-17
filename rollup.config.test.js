import { commonInput, commonOutput } from './rollup.config'

const outputDirectory = 'test-dist'

export default [
  {
    ...commonInput,
    output: [
      {
        ...commonOutput,
        file: `${outputDirectory}/intellifendlite.min.js`,
        format: 'iife',
      },
    ],
  },
]