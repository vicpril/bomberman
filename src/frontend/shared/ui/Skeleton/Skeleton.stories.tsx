import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Skeleton } from './Skeleton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/Skeleton',
  component: Skeleton,
  args: {
    children: 'Skeleton',
  },
} as ComponentMeta<typeof Skeleton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />

export const Normal = Template.bind({})
Normal.args = {
  width: '100%',
  height: 100,
}

export const Circle = Template.bind({})
Circle.args = {
  width: 200,
  height: 200,
  border: '50%',
}
