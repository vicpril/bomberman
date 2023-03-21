module.exports = {
  stories: [
    '../../../src/frontend/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-themes',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
}
