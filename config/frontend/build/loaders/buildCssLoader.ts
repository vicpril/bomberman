import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default (isDev: boolean) => ({
  test: /\.(sc|sa|c)ss$/i,
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
})
