import { ResolveOptions } from 'webpack'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import { BuildOptions } from './types'

export const buildResolvers = (options: BuildOptions): ResolveOptions => {
  const { paths } = options
  return {
    modules: [paths.src, 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: './tsconfig.json' }),
    ],
  }
}
