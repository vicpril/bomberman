import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Popover } from './Popover'
import { Text } from '@/shared/ui/Text/Text'
import { Button } from '@/shared/ui/Button/Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/Popups/Popover',
  component: Popover,
  args: {
    children: 'Popover',
  },
  decorators: [
    (Story) => <div style={{ padding: 60 }}><Story /></div>,
  ],
} as ComponentMeta<typeof Popover>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />

const children = (
  <>
    <Text title="Item 1" text="item 1" />
    <Text title="Item 2" text="item 2" />
    <Text title="Item 3" text="item 3" />
  </>
)

const trigger = (<Button>Нажми</Button>)

export const TopLeft = Template.bind({})
TopLeft.args = {
  direction: 'top left',
  trigger,
  children,
}

export const TopRight = Template.bind({})
TopRight.args = {
  trigger,
  children,
  direction: 'top right',
}

export const BottomLeft = Template.bind({})
BottomLeft.args = {
  trigger,
  children,
  direction: 'bottom left',
}

export const BottomRight = Template.bind({})
BottomRight.args = {
  trigger,
  children,
  direction: 'bottom right',
}
