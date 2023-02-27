import { resolve } from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import { Configuration } from 'webpack'
import 'webpack-dev-server'

const dev = process.env.DEV === '1'

const config: Configuration = {
  mode: dev ? 'development' : 'production',
  target: 'web',
  devtool: 'inline-source-map',

  entry: './console/index.ts',

  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: `console/index.html`,
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'assets' }],
    }),
  ],

  devServer: {
    compress: !dev,
    port: 8080,
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.ts', '.json'],
  },

  performance: {
    hints: dev ? false : 'error',
  },
}

module.exports = [config]
