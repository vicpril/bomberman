import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NotificationButton } from './NotificationButton'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/NotificationButton',
  component: NotificationButton,
  args: {
    children: 'NotificationButton',
  },
} as ComponentMeta<typeof NotificationButton>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof NotificationButton> = (args) => <NotificationButton {...args} />

export const Normal = Template.bind({})
Normal.args = {}
