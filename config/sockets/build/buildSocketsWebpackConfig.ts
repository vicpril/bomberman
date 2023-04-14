import { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'
import { BuildOptions } from './types'
import { buildLoaders } from './buildLoaders'
import { buildResolvers } from './buildResolvers'
import { buildPlugins } from './buildPlugins'

export function buildSocketsWebpackConfig(options: BuildOptions): Configuration {
  const { mode, paths } = options

  return {
    name: 'sockets',
    mode,
    target: 'node',
    externalsPresets: { node: true },
    entry: paths.entry,
    output: {
      filename: 'sockets.js',
      libraryTarget: 'commonjs',
      path: paths.output,
      clean: true,
    },
    resolve: buildResolvers(options),
    plugins: buildPlugins(options),

    module: {
      rules: buildLoaders(),
    },
    externals: [nodeExternals()],
    watch: false,
  }
}
