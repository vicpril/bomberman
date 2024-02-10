import { ComponentStory, ComponentMeta } from '@storybook/react'

import ArticleRating from './ArticleRating'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/ArticleRating',
  component: ArticleRating,
  args: {
    children: 'ArticleRating',
  },
} as ComponentMeta<typeof ArticleRating>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof ArticleRating> = (args) => <ArticleRating {...args} />

export const Normal = Template.bind({})
Normal.args = {}
