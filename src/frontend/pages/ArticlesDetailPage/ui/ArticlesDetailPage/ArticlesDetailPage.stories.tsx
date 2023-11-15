import { ComponentStory, ComponentMeta } from '@storybook/react'

import ArticlesDetailPage from './ArticlesDetailPage'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/ArticlesDetailPage',
  component: ArticlesDetailPage,
  args: {
    children: 'ArticlesDetailPage',
  },
} as ComponentMeta<typeof ArticlesDetailPage>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof ArticlesDetailPage> = (args) => <ArticlesDetailPage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
