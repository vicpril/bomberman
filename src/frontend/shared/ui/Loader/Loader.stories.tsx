import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Loader, LoaderSize } from './Loader'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'shared/Loader',
    component: Loader,
} as ComponentMeta<typeof Loader>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />

export const LoaderS = Template.bind({})
LoaderS.args = { size: LoaderSize.S }

export const LoaderM = Template.bind({})
LoaderM.args = { size: LoaderSize.M }

export const LoaderL = Template.bind({})
LoaderL.args = { size: LoaderSize.L }
