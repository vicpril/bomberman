import path from 'path'
import webpack from 'webpack'
import { buildWebpackConfig } from './build/buildWebpackConfig'
import { BuildPaths } from './build/types'
import { BuildEnv } from '../types'
import { defineEnv } from '../define-env'

export default (env?: BuildEnv) => {
    const mode = env?.mode || 'development'

    defineEnv(mode)

    const PORT = env?.port || 3000
    const apiUrl = process.env.API_URL || 'http://localhost:3001/api/v1'
    const jsonServerUrl = process.env.API_JSON_URL || 'http://localhost:3003'
    const socketsUrl = process.env.SOCKETS_URL || 'http://localhost:3002'
    const socketsPath = process.env.SOCKETS_PATH || '/socket.io'

    const isDev = env?.mode === 'development'

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
        socketsPath,
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
