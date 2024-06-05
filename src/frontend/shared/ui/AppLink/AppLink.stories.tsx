import { ComponentStory, ComponentMeta } from '@storybook/react'

import { BackgroundDecorator } from '@/shared/config/storybook/BackgroundDecorator'
import { AppLink } from './AppLink'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/AppLink',
    component: AppLink,
    args: {
        to: '/',
    },
} as ComponentMeta<typeof AppLink>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />

export const Primary = Template.bind({})
Primary.args = {
    children: 'Link...',
    theme: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
    children: 'Link...',
    theme: 'inverted',
}
Secondary.decorators = [BackgroundDecorator]
Secondary.parameters = {
    background: 'inverted',
}

export const SizeS = Template.bind({})
SizeS.args = {
    children: 'Link...',
    theme: 'primary',
    size: 's',
}
export const SizeM = Template.bind({})
SizeM.args = {
    children: 'Link...',
    theme: 'primary',
    size: 'm',
}
export const SizeL = Template.bind({})
SizeL.args = {
    children: 'Link...',
    theme: 'primary',
    size: 'l',
}
