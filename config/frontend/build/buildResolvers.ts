import { ResolveOptions } from 'webpack'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import { BuildOptions } from './types'

export function buildResolvers(options: BuildOptions): ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
    alias: {
      '@': options.paths.src,
    },
    plugins: [
      new TsconfigPathsPlugin({ configFile: 'config/frontend/tsconfig.json' }),
    ],
    preferAbsolute: true,
    modules: [options.paths.src, 'node_modules'],
  }
}
