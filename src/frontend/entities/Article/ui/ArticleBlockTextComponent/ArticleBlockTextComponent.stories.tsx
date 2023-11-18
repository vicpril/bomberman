import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticleBlockTextComponent } from './ArticleBlockTextComponent'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/ArticleBlockTextComponent',
  component: ArticleBlockTextComponent,
  args: {
    children: 'ArticleBlockTextComponent',
  },
} as ComponentMeta<typeof ArticleBlockTextComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof ArticleBlockTextComponent> = (args) => <ArticleBlockTextComponent {...args} />

export const Normal = Template.bind({})
Normal.args = {}
