import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StarRating } from './StarRating'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/StarRating',
  component: StarRating,
  args: {
    children: 'StarRating',
  },
} as ComponentMeta<typeof StarRating>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof StarRating> = (args) => <StarRating {...args} />

export const Normal = Template.bind({})
Normal.args = {}
