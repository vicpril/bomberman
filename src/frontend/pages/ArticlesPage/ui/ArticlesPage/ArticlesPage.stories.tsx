import { ComponentStory, ComponentMeta } from '@storybook/react'

import ArticlesPage from './ArticlesPage'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'pages/ArticlesPage',
  component: ArticlesPage,
  args: {
    children: 'ArticlesPage',
  },
} as ComponentMeta<typeof ArticlesPage>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
