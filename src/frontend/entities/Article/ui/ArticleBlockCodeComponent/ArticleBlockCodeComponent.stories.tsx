import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticleBlockCodeComponent } from './ArticleBlockCodeComponent'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/ArticleBlockCodeComponent',
  component: ArticleBlockCodeComponent,
  args: {
    children: 'ArticleBlockCodeComponent',
  },
} as ComponentMeta<typeof ArticleBlockCodeComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof ArticleBlockCodeComponent> = (args) => <ArticleBlockCodeComponent {...args} />

export const Normal = Template.bind({})
Normal.args = {}
