import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticlesFilters } from './ArticlesFilters'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'features/ArticlesFilters',
  component: ArticlesFilters,
  args: {
    children: 'ArticlesFilters',
  },
} as ComponentMeta<typeof ArticlesFilters>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof ArticlesFilters> = (args) => <ArticlesFilters {...args} />

export const Normal = Template.bind({})
Normal.args = {}
