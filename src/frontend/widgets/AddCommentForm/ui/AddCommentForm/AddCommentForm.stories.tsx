import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import AddCommentForm from './AddCommentForm'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'widgets/AddCommentForm',
    component: AddCommentForm,
    args: {
        children: 'AddCommentForm',
    },
} as ComponentMeta<typeof AddCommentForm>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// eslint-disable-next-line i18next/no-literal-string
const Template: ComponentStory<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [StoreDecorator({ addCommentForm: { text: '' } })]
