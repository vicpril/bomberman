import webpack from 'webpack'
import buildCssLoader from './loaders/buildCssLoader'
import { BuildOptions } from './types'

export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
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

  const babalLoader = {
    test: /\.(js|jsx|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        // plugins: [
        //   ["i18next-extract", {
        //       "locales": [
        //         "ru",
        //         "en"
        //       ],
        //       "keyAsDefaultValue": true
        //     }]
        // ]
      },
    },
  }

  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  return [
    svgLoader,
    fileLoader,
    fontLoader,
    babalLoader,
    tsLoader,
    cssLoader,
  ]
}
