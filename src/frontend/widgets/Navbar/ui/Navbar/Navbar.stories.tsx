import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import { Navbar } from './Navbar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'widgets/Navbar',
    component: Navbar,
    decorators: [
        (Story) => (
            <>
                <Story />
                <div id="Navbars" />
            </>
        ),
    ],
} as ComponentMeta<typeof Navbar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />

export const Auth = Template.bind({})
Auth.args = {}
Auth.decorators = [StoreDecorator({ user: { authData: { id: '1' } } })]

export const NotAuth = Template.bind({})
NotAuth.args = {}
NotAuth.decorators = [StoreDecorator({ user: { authData: undefined } })]
