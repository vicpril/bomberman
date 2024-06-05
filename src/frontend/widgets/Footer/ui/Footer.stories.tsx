import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Footer } from './Footer'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'widgets/Footer',
    component: Footer,
    args: {
        children: 'Footer',
    },
} as ComponentMeta<typeof Footer>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />

export const Normal = Template.bind({})
Normal.args = {}
