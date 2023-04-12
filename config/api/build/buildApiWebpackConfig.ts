import { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'
import { BuildOptions } from './types'
import { buildLoaders } from './buildLoaders'
import { buildResolvers } from './buildResolvers'

export function buildApiWebpackConfig(options: BuildOptions): Configuration {
  const { mode, paths, isDev } = options

  return {
    name: 'server',
    mode,
    target: 'node',
    externalsPresets: { node: true },
    entry: paths.entry,
    output: {
      filename: 'server.js',
      libraryTarget: 'commonjs',
      path: paths.output,
      clean: true,
    },
    resolve: buildResolvers(options),

    module: {
      rules: buildLoaders(options),
    },
    devtool: isDev ? 'source-map' : undefined,
    externals: [nodeExternals()],
  }
}
