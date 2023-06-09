import { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { BuildOptions } from './types'

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: false,
    historyApiFallback: true,
    hot: true,
    watchFiles: options.paths.public,
  }
}
