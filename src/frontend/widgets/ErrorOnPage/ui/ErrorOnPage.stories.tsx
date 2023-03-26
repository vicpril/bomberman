import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ErrorOnPage } from './ErrorOnPage'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/ErrorOnPage',
  component: ErrorOnPage,
} as ComponentMeta<typeof ErrorOnPage>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ErrorOnPage> = () => <ErrorOnPage />

export const Default = Template.bind({})
