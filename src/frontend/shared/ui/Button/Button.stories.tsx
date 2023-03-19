import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button, ButtonTheme } from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/Button',
  component: Button,
  args: {
    children: 'Button',
  },
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Clear = Template.bind({})
Clear.args = {
  theme: ButtonTheme.Clear,
}

export const ClearInverted = Template.bind({})
ClearInverted.args = {
  theme: ButtonTheme.ClearInverted,
}

export const Outline = Template.bind({})
Outline.args = {
  theme: ButtonTheme.Outline,
}

export const Background = Template.bind({})
Background.args = {
  theme: ButtonTheme.Background,
}

export const BackgroundInverted = Template.bind({})
BackgroundInverted.args = {
  theme: ButtonTheme.BackgroundInverted,
}

export const Squared = Template.bind({})
Squared.args = {
  children: '>',
  theme: ButtonTheme.BackgroundInverted,
  square: true,
}

export const DisabledOutline = Template.bind({})
DisabledOutline.args = {
  theme: ButtonTheme.Outline,
  disabled: true,
}
