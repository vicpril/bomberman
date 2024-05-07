import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import AdminPanelPage from './AdminPanelPage'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'pages/admin/AdminPanelPage',
    component: AdminPanelPage,
    args: {
        children: 'AdminPanelPage',
    },
} as ComponentMeta<typeof AdminPanelPage>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof AdminPanelPage> = (args) => <AdminPanelPage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]
