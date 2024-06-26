import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import LoginForm from './LoginForm'
import { loginReducer } from '../../model/slice/loginSlice'

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    // argTypes: {
    //   backgroundColor: { control: 'color' },
    // },
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />

export const Primary = Template.bind({})
Primary.args = {}
Primary.decorators = [
    StoreDecorator(
        {
            loginForm: { username: '123', password: 'qwe' },
        },
        { loginForm: loginReducer },
    ),
]

export const withError = Template.bind({})
withError.args = {}
withError.decorators = [
    StoreDecorator(
        {
            loginForm: { username: '123', password: 'qwe', error: 'ERROR' },
        },
        { loginForm: loginReducer },
    ),
]

export const Loading = Template.bind({})
Loading.args = {}
Loading.decorators = [
    StoreDecorator(
        {
            loginForm: { isLoading: true },
        },
        { loginForm: loginReducer },
    ),
]
