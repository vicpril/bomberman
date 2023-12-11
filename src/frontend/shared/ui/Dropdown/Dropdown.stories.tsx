import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Dropdown } from './Dropdown'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/Dropdown',
  component: Dropdown,
  args: {
    children: 'Dropdown',
  },
} as ComponentMeta<typeof Dropdown>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />

export const Normal = Template.bind({})
Normal.args = {}
