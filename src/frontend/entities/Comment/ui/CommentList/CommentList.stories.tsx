import { ComponentStory, ComponentMeta } from '@storybook/react'

import { CommentList } from './CommentList'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/CommentList',
  component: CommentList,
  args: {
    children: 'CommentList',
  },
} as ComponentMeta<typeof CommentList>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />

export const Normal = Template.bind({})
Normal.args = {}
