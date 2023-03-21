import path from 'path'
import webpack, { DefinePlugin } from 'webpack'
import buildCssLoader from '../build/loaders/buildCssLoader'
import { BuildPaths } from '../build/types'

export default ({ config }: {config: webpack.Configuration}) => {
  const rootDir = path.resolve(__dirname, '..', '..', '..')
  const srcDir = path.resolve(rootDir, 'src')
  const srcFrontendDir = path.resolve(srcDir, 'frontend')

  const paths: BuildPaths = {
    entry: '',
    html: '',
    output: '',
    src: srcFrontendDir,
  }

  config.resolve?.modules?.unshift(paths.src)
  config.resolve?.extensions?.push('.ts', '.tsx')
  if (config.resolve?.alias) {
    config.resolve.alias = { '@': srcFrontendDir, ...config.resolve.alias }
  }

  if (config.module?.rules) {
    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module?.rules?.map((rule) => {
      if (rule === '...') return rule
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i }
      }
      return rule
    })
  }

  config.module?.rules?.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  })

  config.module?.rules?.push(buildCssLoader(true))

  config.plugins?.push(new DefinePlugin({
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify(''),
  }))

  return config
}
