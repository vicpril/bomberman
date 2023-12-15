import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin'
import { BuildOptions } from '../types'

interface BabelLoaderOptions extends BuildOptions {
  isTsx: boolean
}

export const buildBabelLoader = ({ isDev, isTsx } : BabelLoaderOptions) => ({
  test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: [
      //   ["i18next-extract", {
      //       "locales": [
      //         "ru",
      //         "en"
      //       ],
      //       "keyAsDefaultValue": true
      //     }]
        [
          '@babel/plugin-transform-typescript',
          {
            isTsx,
          },
        ],
        '@babel/plugin-transform-runtime',
        isTsx && !isDev && [
          babelRemovePropsPlugin,
          {
            props: ['data-testid'],
          },
        ],

      ].filter(Boolean),
    },
  },
})
