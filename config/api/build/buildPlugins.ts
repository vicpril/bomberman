import webpack from 'webpack'
// import CopyPlugin from 'copy-webpack-plugin'
// import path from 'path'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import { BuildOptions } from './types'

export function buildPlugins({ isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins: webpack.WebpackPluginInstance[] = [

    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
    //   ],
    // }),
    ...(isDev ? [new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    })] : []),
  ]

  return plugins
}
