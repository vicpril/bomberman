import path from 'path'
import webpack, { DefinePlugin, RuleSetRule } from 'webpack'
import buildCssLoader from '../build/loaders/buildCssLoader'
import { BuildPaths } from '../build/types'

export default ({ config }: { config: webpack.Configuration }) => {
    const rootDir = path.resolve(__dirname, '..', '..', '..')
    const srcDir = path.resolve(rootDir, 'src')
    const srcFrontendDir = path.resolve(srcDir, 'frontend')

    const paths: BuildPaths = {
        entry: '',
        html: '',
        output: '',
        public: '',
        socketsUrl: '',
        apiUrl: '',
        jsonServerUrl: '',
        src: srcFrontendDir,
    }

    config.resolve?.modules?.unshift(paths.src)
    config.resolve?.extensions?.push('.ts', '.tsx')
    if (config.resolve?.alias) {
        config.resolve.alias = {
            '@': srcFrontendDir,
            '@game': path.resolve(srcDir, 'game'),
            ...config.resolve.alias,
        }
    }

    if (config.module?.rules) {
        // eslint-disable-next-line no-param-reassign
        // @ts-ignore
        config.module.rules = config.module?.rules?.map((rule: RuleSetRule) => {
            // if (rule === '...') return rule
            if (/svg/.test(rule.test as string)) {
                return { ...rule, exclude: /\.svg$/i }
            }
            return rule
        })
    }

    // loaders
    config.module?.rules?.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    })
    config.module?.rules?.push(...buildCssLoader(true, false))
    config.module?.rules?.push({
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    })

    // plugins
    config.plugins?.push(
        new DefinePlugin({
            __IS_DEV__: JSON.stringify(true),
            __API_JSON__: JSON.stringify('http://localhost:3003'),
            __API__: JSON.stringify(''),
            __SOCKETS_URL__: JSON.stringify(''),
            __PROJECT__: JSON.stringify('storybook'),
        }),
    )

    return config
}
