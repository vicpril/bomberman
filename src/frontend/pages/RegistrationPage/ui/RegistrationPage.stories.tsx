import { ComponentStory, ComponentMeta } from '@storybook/react'

import RegistrationPage from './RegistrationPage'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/RegistrationPage',
    component: RegistrationPage,
    args: {
        children: 'RegistrationPage',
    },
} as ComponentMeta<typeof RegistrationPage>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof RegistrationPage> = (args) => <RegistrationPage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
