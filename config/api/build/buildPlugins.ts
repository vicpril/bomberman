import webpack from 'webpack'
import { BuildOptions } from './types'

export function buildPlugins({ isDev }: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins: webpack.WebpackPluginInstance[] = [

    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),
  ]

  return plugins
}
