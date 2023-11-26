import { ComponentStory, ComponentMeta } from '@storybook/react'

import MainPage from './MainPage'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'pages/MainPage',
  component: MainPage,
} as ComponentMeta<typeof MainPage>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MainPage> = () => <MainPage />

export const Auth = Template.bind({})
Auth.args = {}
Auth.decorators = [
  StoreDecorator({ user: { authData: { id: '1' } } }),
]

export const NotAuth = Template.bind({})
NotAuth.args = {}
NotAuth.decorators = [
  StoreDecorator({ user: { authData: undefined } }),
]
