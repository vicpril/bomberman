import { ComponentStory, ComponentMeta } from '@storybook/react'

import { RegistrationForm } from './RegistrationForm'

export default {
    title: 'features/RegistrationForm',
    component: RegistrationForm,
    args: {
        children: 'RegistrationForm',
    },
} as ComponentMeta<typeof RegistrationForm>

const Template: ComponentStory<typeof RegistrationForm> = (args) => <RegistrationForm {...args} />

export const Normal = Template.bind({})
Normal.args = {}
