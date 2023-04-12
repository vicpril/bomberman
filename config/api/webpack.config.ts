import webpack from 'webpack'
import path from 'path'
import { BuildEnv } from '../types'
import { BuildPaths } from './build/types'
import { buildApiWebpackConfig } from './build/buildApiWebpackConfig'

export default (env: BuildEnv): webpack.Configuration => {
  const mode = env.mode || 'development'
  const PORT = env.port || 3001
  const apiUrl = env.apiUrl || `http://localhost:${PORT}`

  const isDev = mode === 'development'

  const rootDir = env?.root || path.resolve(__dirname, '..', '..')
  const srcDir = path.resolve(rootDir, 'src')
  const srcApiDir = path.resolve(srcDir, 'api')

  const paths: BuildPaths = {
    root: rootDir,
    entry: path.resolve(srcApiDir, 'server.ts'),
    output: path.resolve(rootDir, 'build-server'),
    src: srcApiDir,
  }

  const config: webpack.Configuration = buildApiWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    apiUrl,
  })

  return config
}
