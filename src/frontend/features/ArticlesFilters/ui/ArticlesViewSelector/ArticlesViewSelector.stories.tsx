import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticlesViewSelector } from './ArticlesViewSelector'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'entities/ArticlesViewSelector',
    component: ArticlesViewSelector,
    args: {
        children: 'ArticlesViewSelector',
    },
} as ComponentMeta<typeof ArticlesViewSelector>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof ArticlesViewSelector> = (args) => <ArticlesViewSelector {...args} />

export const Normal = Template.bind({})
Normal.args = {}
