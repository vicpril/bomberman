import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AppImage } from './AppImage'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/AppImage',
  component: AppImage,
  args: {
    children: 'AppImage',
  },
} as ComponentMeta<typeof AppImage>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof AppImage> = (args) => <AppImage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
