import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ListBox } from './ListBox'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/Popups/ListBox',
  component: ListBox,
  args: {
    children: 'ListBox',
  },
  decorators: [
    (Story) => <div style={{ padding: 60 }}><Story /></div>,
  ],
} as ComponentMeta<typeof ListBox>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />

const items = [
  { value: '1', label: 'item 1' },
  { value: '2', label: 'item 2' },
  { value: '3', label: 'item 3', disabled: true },
  { value: '4', label: 'item 4' },
]

export const Normal = Template.bind({})
Normal.args = {
  options: items,
  label: 'Label',
  value: '',
  defaultValue: 'Выберите',
}

export const TopLeft = Template.bind({})
TopLeft.args = {
  options: items,
  label: 'Label',
  value: '',
  defaultValue: 'Выберите',
  direction: 'top left',
}

export const TopRight = Template.bind({})
TopRight.args = {
  options: items,
  label: 'Label',
  value: '',
  defaultValue: 'Выберите',
  direction: 'top right',
}

export const BottomLeft = Template.bind({})
BottomLeft.args = {
  options: items,
  label: 'Label',
  value: '',
  defaultValue: 'Выберите',
  direction: 'bottom left',
}

export const BottomRight = Template.bind({})
BottomRight.args = {
  options: items,
  label: 'Label',
  value: '',
  defaultValue: 'Выберите',
  direction: 'bottom right',
}
