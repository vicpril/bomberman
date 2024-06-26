import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import CircularDependencyPlugin from 'circular-dependency-plugin'
import { BuildOptions } from './types'

export function buildPlugins({
  paths, isDev, project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins: webpack.WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),

    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(paths.apiUrl),
      __API_JSON__: JSON.stringify(paths.jsonServerUrl),
      __SOCKETS_URL__: JSON.stringify(paths.socketsUrl),
      __SOCKETS_PATH__: JSON.stringify(paths.socketsPath),
      __PROJECT__: JSON.stringify(project),
      __CLIENT_URL__: JSON.stringify(paths.clientUrl),
    }),
    new ReactRefreshWebpackPlugin(),

    new ForkTsCheckerWebpackPlugin({
      issue: {
        include: [
          { file: '**/src/frontentd/**/*' },
        ],
        exclude: [
          { file: '**/*.test.ts' },
        ],
      },
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
    ...(isDev ? [new CircularDependencyPlugin({
      include: /src\/frontend/,
      exclude: /features\/Game/,
      failOnError: true,
    })] : []),
  ]

  plugins.push(new CopyPlugin({
    patterns: [
      { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
      { from: path.resolve(paths.public, 'assets'), to: path.resolve(paths.output, 'assets') },
    ],
  }))

  if (isDev) {
    plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }))
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  if (!isDev) {
    plugins.push(new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }))
    
  }

  return plugins
}
