import { ComponentStory, ComponentMeta } from '@storybook/react'

import AdminPanelPage from './AdminPanelPage'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/AdminPanelPage',
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
