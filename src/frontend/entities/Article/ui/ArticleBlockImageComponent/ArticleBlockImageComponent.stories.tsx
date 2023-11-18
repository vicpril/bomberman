import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticleBlockImageComponent } from './ArticleBlockImageComponent'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/ArticleBlockImageComponent',
  component: ArticleBlockImageComponent,
  args: {
    children: 'ArticleBlockImageComponent',
  },
} as ComponentMeta<typeof ArticleBlockImageComponent>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof ArticleBlockImageComponent> = (args) => <ArticleBlockImageComponent {...args} />

export const Normal = Template.bind({})
Normal.args = {}
