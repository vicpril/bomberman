import { ComponentStory, ComponentMeta } from '@storybook/react'

import ForbiddenPage from './ForbiddenPage'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

export default {
  title: 'pages/ForbiddenPage',
  component: ForbiddenPage,
  args: {
    children: 'ForbiddenPage',
  },
} as ComponentMeta<typeof ForbiddenPage>

const Template: ComponentStory<typeof ForbiddenPage> = (args) => <ForbiddenPage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({})]
