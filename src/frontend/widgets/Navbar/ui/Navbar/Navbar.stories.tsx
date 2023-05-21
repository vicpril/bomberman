import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Navbar } from './Navbar'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

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
    StoreDecorator({ user: { authData: { id: 1 } } }),
  ],
} as ComponentMeta<typeof Navbar>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />

export const Default = Template.bind({})
Default.args = {}
