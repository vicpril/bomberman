import { addDecorator } from '@storybook/react'
import { withThemes } from 'storybook-addon-themes'
import { StyleDecorator } from '../../../src/frontend/shared/config/storybook/StyleDecorator'
import { ThemeDecorator } from '../../../src/frontend/shared/config/storybook/ThemeDecorator'
import { RouterDecorator } from '../../../src/frontend/shared/config/storybook/RouterDecorator'
import { SuspenseDecorator } from '../../../src/frontend/shared/config/storybook/SuspenseDecorator'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: 'dark',
    list: [
      { name: 'dark', class: 'dark', color: '#000' },
      { name: 'light', class: 'light', color: '#e8e8ea' },
    ],
    Decorator: ThemeDecorator,
  },
}

addDecorator(StyleDecorator)
addDecorator(withThemes)
addDecorator(RouterDecorator)
addDecorator(SuspenseDecorator)
