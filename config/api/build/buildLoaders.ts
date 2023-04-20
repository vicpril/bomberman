import webpack from 'webpack'
import { BuildOptions } from './types'

const fileRegex = /^(?!.*\.inline).*\.(svg|jpe?g|png|gif|eot|woff2?|ttf)$/

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader?configFile=src/api/tsconfig.json',
    exclude: /node_modules/,
  }

  const fileLoader = {
    test: fileRegex,
    type: 'asset/resource',
  }

  const cssLoader = {
    test: /\.css$/,
    loader: 'null-loader',
  }

  return [
    tsLoader,
    fileLoader,
    cssLoader,
  ]
}
