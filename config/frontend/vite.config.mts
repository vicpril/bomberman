import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const config = defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    // const mode = process.env?.mode || 'development'
    // const PORT = process.env?.port || 3000
    const apiUrl = process.env.API_URL || 'http://localhost:3001/api/v1'
    const jsonServerUrl = process.env.API_JSON_URL || 'http://localhost:3003'
    const socketsUrl = process.env.SOCKETS_URL || 'http://localhost:3002'
    const socketsPath = process.env.SOCKETS_PATH || '/socket.io'

    const isDev = mode === 'development'

    const rootDir = path.resolve(__dirname, '..', '..')
    const srcDir = path.resolve(rootDir, 'src')
    const srcFrontendDir = path.resolve(srcDir, 'frontend')
    const srcGameDir = path.resolve(srcDir, 'game')
    const srcPublicDir = path.resolve(srcDir, 'public')
    const srcLocalesDir = path.resolve(srcPublicDir, 'locales')
    const srcPublicAssetsDir = path.resolve(srcPublicDir, 'assets')
    // const srcOutput = path.resolve(rootDir, 'build-frontend')

    return {
        root: srcFrontendDir,
        plugins: [
            react(),
            svgr({
                include: '**/*.svg',
                svgrOptions: {
                    exportType: 'default',
                    icon: true,
                    plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
                    svgo: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            }),

            viteStaticCopy({
                targets: [
                    {
                        src: srcLocalesDir,
                        dest: './',
                    },
                    {
                        src: srcPublicAssetsDir,
                        dest: './',
                    },
                ],
            }),
        ],
        resolve: {
            alias: [
                { find: '@', replacement: srcFrontendDir },
                { find: '@game', replacement: srcGameDir },
            ],
        },
        define: {
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __API_JSON__: JSON.stringify(jsonServerUrl),
            __SOCKETS_URL__: JSON.stringify(socketsUrl),
            __SOCKETS_PATH__: JSON.stringify(socketsPath),
            __PROJECT__: JSON.stringify('frontend'),
        },
        css: {
            modules: {
                generateScopedName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]',
            },
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "@/app/styles/globals-for-preprocessor.scss";',
                },
            },
        },
    }
})

export default config
