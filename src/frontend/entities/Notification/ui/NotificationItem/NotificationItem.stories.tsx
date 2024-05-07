import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NotificationItem } from './NotificationItem'

export default {
    title: 'entities/NotificationItem',
    component: NotificationItem,
    args: {
        children: 'NotificationItem',
    },
} as ComponentMeta<typeof NotificationItem>

const item = {
    id: '1',
    title: 'Уведомление 1',
    description: 'Произошло какое-то событие',
    userId: '1',
}

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />

export const Normal = Template.bind({})
Normal.args = {
    item,
}
