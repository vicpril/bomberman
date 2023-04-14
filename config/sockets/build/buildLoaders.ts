import webpack from 'webpack'

export function buildLoaders(): webpack.RuleSetRule[] {
  const tsLoader = {
    test: /\.ts?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  return [
    tsLoader,
  ]
}
