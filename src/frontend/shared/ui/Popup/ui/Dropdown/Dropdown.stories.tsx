import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Dropdown, DropdownItem } from './Dropdown'
import { Button } from '../../../Button/Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/Popups/Dropdown',
  component: Dropdown,
  args: {
    children: 'Dropdown',
  },
} as ComponentMeta<typeof Dropdown>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />

const options: DropdownItem[] = [
  {
    content: <Button>Item 1</Button>,
    // onClick: () => {},
  },
  {
    content: <Button>Item 2 (href)</Button>,
    href: '/',
  },
  {
    content: <Button>Item 1 (disabled)</Button>,
    // onClick: () => {},
    disabled: true,
  },
]

export const Normal = Template.bind({})
Normal.args = {
  trigger: <Button>Open</Button>,
  items: options,
}
