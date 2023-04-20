import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { RuleSetRule } from 'webpack'

export default (isDev: boolean, includeCss = true) => {
  const sass = {
    test: /\.(sc|sa)ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resourcePath: string) => !!resourcePath.includes('.module.'),
            localIdentName: isDev
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:8]',
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          additionalData: '@import "@/app/styles/globals-for-preprocessor.scss";',
        },
      },
    ],
  }

  const css = {
    test: /\.css$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resourcePath: string) => !!resourcePath.includes('.module.'),

            localIdentName: isDev
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:8]',
          },
        },
      },
    ],
  }

  const loaders: RuleSetRule[] = [sass]

  if (includeCss) {
    loaders.push(css)
  }

  return loaders
}
