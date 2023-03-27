import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProfilePage from './ProfilePage'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
} as ComponentMeta<typeof ProfilePage>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />

export const Default = Template.bind({})
Default.args = {}
