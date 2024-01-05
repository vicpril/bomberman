import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Overlay } from './Overlay'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/Overlay',
  component: Overlay,
  args: {
    children: 'Overlay',
  },
} as ComponentMeta<typeof Overlay>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof Overlay> = (args) => <Overlay {...args} />

export const Normal = Template.bind({})
Normal.args = {}
