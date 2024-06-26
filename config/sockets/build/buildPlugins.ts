import webpack from 'webpack'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'
import { BuildOptions } from './types'

export function buildPlugins({ paths, isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins: webpack.WebpackPluginInstance[] = [
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __BASE_URL__: JSON.stringify(paths.baseUrl),
      __SOCKETS_URL__: JSON.stringify(paths.socketsUrl),
      __SOCKETS_PATH__: JSON.stringify(paths.socketsPath),
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(paths.src, 'index.js'), to: path.resolve(paths.output, 'index.js') },
      ],
    }),
  ]

  return plugins
}
