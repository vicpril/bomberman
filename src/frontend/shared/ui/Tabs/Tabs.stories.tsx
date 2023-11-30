import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Tabs } from './Tabs'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/Tabs',
  component: Tabs,
  args: {
    children: 'Tabs',
  },
} as ComponentMeta<typeof Tabs>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />

export const Normal = Template.bind({})
Normal.args = {
  options: [
    { value: '1', label: 'tab 1' },
    { value: '2', label: 'tab 2' },
    { value: '3', label: 'tab 3' },
  ],
  value: 2,
}
