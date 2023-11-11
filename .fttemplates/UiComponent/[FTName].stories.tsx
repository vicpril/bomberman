import { ComponentStory, ComponentMeta } from '@storybook/react'

import { [FTName] } from './[FTName]'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/[FTName]',
  component: [FTName],
  args: {
    children: '[FTName]',
  },
} as ComponentMeta<typeof [FTName]>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof [FTName]> = (args) => <[FTName] {...args} />

export const Normal = Template.bind({})
Normal.args = {}
