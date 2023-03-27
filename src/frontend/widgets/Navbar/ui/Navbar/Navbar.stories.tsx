import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Navbar } from './Navbar'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/Navbar',
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

export const Default = Template.bind({})
