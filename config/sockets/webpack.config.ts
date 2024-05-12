import webpack from 'webpack'
import path from 'path'
import { BuildEnv } from '../types'
import { BuildPaths } from './build/types'
import { buildSocketsWebpackConfig } from './build/buildSocketsWebpackConfig'
import { defineEnv } from '../define-env'

export default (env: BuildEnv): webpack.Configuration => {
    const mode = env.mode || 'development'
    const PORT = env.port || 3002

    defineEnv(mode)

    const url = process.env.SOCKETS_URL || `http://localhost:3002`

    const isDev = mode === 'development'

    const rootDir = env?.root || path.resolve(__dirname, '..', '..')
    const srcDir = path.resolve(rootDir, 'src')
    const srcApiDir = path.resolve(srcDir, 'game', 'server-side')

    const paths: BuildPaths = {
        root: rootDir,
        entry: path.resolve(srcApiDir, 'sockets.ts'),
        output: path.resolve(rootDir, 'build-sockets'),
        src: srcApiDir,
        socketsUrl: url,
        socketsPath: process.env.SOCKETS_PATH || '/',
    }

    const config: webpack.Configuration = buildSocketsWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
    })

    return config
}
