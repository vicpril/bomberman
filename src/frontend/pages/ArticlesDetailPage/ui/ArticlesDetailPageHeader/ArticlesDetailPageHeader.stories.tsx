import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticlesDetailPageHeader } from './ArticlesDetailPageHeader'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'pages/articles/ArticlesDetailPageHeader',
  component: ArticlesDetailPageHeader,
  args: {
    children: 'ArticlesDetailPageHeader',
  },
} as ComponentMeta<typeof ArticlesDetailPageHeader>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof ArticlesDetailPageHeader> = (args) => <ArticlesDetailPageHeader {...args} />

export const Normal = Template.bind({})
Normal.args = {}
