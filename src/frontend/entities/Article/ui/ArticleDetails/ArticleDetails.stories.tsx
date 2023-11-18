import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticleDetails } from './ArticleDetails'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/ArticleDetails',
  component: ArticleDetails,
  args: {
    children: 'ArticleDetails',
  },
} as ComponentMeta<typeof ArticleDetails>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof ArticleDetails> = (args) => <ArticleDetails {...args} />

export const Normal = Template.bind({})
Normal.args = {}
