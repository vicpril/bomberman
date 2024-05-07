import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Drawer } from './Drawer'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/Drawer',
    component: Drawer,
    args: {
        children: 'Drawer',
    },
} as ComponentMeta<typeof Drawer>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />

export const Normal = Template.bind({})
Normal.args = {}
