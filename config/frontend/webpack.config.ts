import path from 'path'
import webpack from 'webpack'
import { buildWebpackConfig } from './build/buildWebpackConfig'
import { BuildPaths } from './build/types'
import { BuildEnv } from '../types'

export default (env?: BuildEnv) => {
  const mode = env?.mode || 'development'
  const PORT = env?.port || 3000
  const apiUrl = env?.apiUrl || 'http://localhost:3001/api/v1'
  const jsonServerUrl = env?.apiUrl || 'http://localhost:8000'
  const socketsUrl = env?.socketsUrl || 'http://localhost:3002'

  const isDev = mode === 'development'

  const rootDir = path.resolve(__dirname, '..', '..')
  const srcDir = path.resolve(rootDir, 'src')
  const srcFrontendDir = path.resolve(srcDir, 'frontend')

  const paths: BuildPaths = {
    entry: path.resolve(srcFrontendDir, 'index.tsx'),
    output: path.resolve(rootDir, 'build-frontend'),
    html: path.resolve(rootDir, 'index.html'),
    src: srcFrontendDir,
    public: path.resolve(srcDir, 'public'),
    socketsUrl,
    apiUrl,
    jsonServerUrl,
  }

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    project: 'frontend',
  })

  return config
}
