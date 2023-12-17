import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { BuildOptions } from './types'
import CircularDependencyPlugin from 'circular-dependency-plugin'

export function buildPlugins({
  paths, isDev, project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const plugins: webpack.WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(paths.apiUrl),
      __API_JSON__: JSON.stringify(paths.jsonServerUrl),
      __SOCKETS_URL__: JSON.stringify(paths.socketsUrl),
      __PROJECT__: JSON.stringify(project),
    }),
    new ReactRefreshWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
      ],
    }),
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

  if (isDev) {
    plugins.push(new BundleAnalyzerPlugin())
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return plugins
}
