import { addDecorator } from '@storybook/react'
import { withThemes } from 'storybook-addon-themes'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator'
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: 'light', color: '#e8e8ea' },
      { name: 'dark', class: 'dark', color: '#090949' },
    ],
    Decorator: ThemeDecorator,
  },
}

addDecorator(StyleDecorator)
addDecorator(withThemes)
addDecorator(RouterDecorator)
