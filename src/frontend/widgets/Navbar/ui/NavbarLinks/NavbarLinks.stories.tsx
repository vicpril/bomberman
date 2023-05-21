import { ComponentStory, ComponentMeta } from '@storybook/react'

import { NavbarLinks } from './NavbarLinks'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'widgets/NavbarLinks',
  component: NavbarLinks,
  decorators: [
    (Story) => (
      <>
        <Story />
        <div id="NavbarLinkss" />
      </>
    ),
  ],
} as ComponentMeta<typeof NavbarLinks>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof NavbarLinks> = (args) => <NavbarLinks {...args} />

export const Default = Template.bind({})
