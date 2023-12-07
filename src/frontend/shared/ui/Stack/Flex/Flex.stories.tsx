import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Flex } from './Flex'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/Flex',
  component: Flex,
  args: {
    children: 'Flex',
  },
} as ComponentMeta<typeof Flex>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />

export const Row = Template.bind({})
Row.args = {
  children: (
    <>
      <div>first</div>
      <div>first</div>
      <div>first</div>
      <div>first</div>
    </>
  ),
}

export const RowGap4 = Template.bind({})
RowGap4.args = {
  gap: '4',
  children: (
    <>
      <div>first</div>
      <div>first</div>
      <div>first</div>
      <div>first</div>
    </>
  ),
}
export const RowGap8 = Template.bind({})
RowGap8.args = {
  gap: '8',
  children: (
    <>
      <div>first</div>
      <div>first</div>
      <div>first</div>
      <div>first</div>
    </>
  ),
}

export const RowGap16 = Template.bind({})
RowGap16.args = {
  gap: '16',
  children: (
    <>
      <div>first</div>
      <div>first</div>
      <div>first</div>
      <div>first</div>
    </>
  ),
}

export const Column = Template.bind({})
Column.args = {
  direction: 'column',
  children: (
    <>
      <div>first</div>
      <div>first</div>
      <div>first</div>
      <div>first</div>
    </>
  ),
}

export const ColumnGap16 = Template.bind({})
ColumnGap16.args = {
  gap: '16',
  direction: 'column',
  children: (
    <>
      <div>first</div>
      <div>first</div>
      <div>first</div>
      <div>first</div>
    </>
  ),
}

export const ColumnAlignEnd = Template.bind({})
ColumnAlignEnd.args = {
  direction: 'column',
  align: 'end',
  children: (
    <>
      <div>first</div>
      <div>first</div>
      <div>first</div>
      <div>first</div>
    </>
  ),
}
