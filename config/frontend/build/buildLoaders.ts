import webpack from 'webpack'
import buildCssLoader from './loaders/buildCssLoader'
import { BuildOptions } from './types'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options
  const svgLoader = {
    test: /\.svg$/,
    use: [{
      loader: '@svgr/webpack',
      options: {
          icon: true,
          svgoConfig: {
              plugins: [
                  {
                      name: 'convertColors',
                      params: {
                          currentColor: true,
                      }
                  }
              ]
          }
      }
  }],
  }

  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  }

  const fontLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  }

  const cssLoader = buildCssLoader(isDev)

  const codeBabalLoader = buildBabelLoader({ ...options, isTsx: false })
  const tsxCodeBabalLoader = buildBabelLoader({ ...options, isTsx: true })

  // DONE: babel-loader setup instead
  // const tsLoader = {
  //   test: /\.tsx?$/,
  //   use: 'ts-loader?configFile=src/frontend/tsconfig.json',
  //   exclude: /node_modules/,
  // }

  return [
    svgLoader,
    fileLoader,
    fontLoader,
    codeBabalLoader,
    tsxCodeBabalLoader,
    // tsLoader,
    ...cssLoader,
  ]
}
