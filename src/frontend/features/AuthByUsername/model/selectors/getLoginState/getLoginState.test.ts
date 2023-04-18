import { StateSchema } from '@/app/providers/StoreProvider'
import { getLoginState } from './getLoginState'
import { initialLodinFormState } from '../../slice/loginSlice'

describe('Selector getLoginState.test', () => {
  test('Username filled', () => {
    const state: DeepPartial<StateSchema> = ({ loginForm: { username: '123123' } })
    expect(getLoginState(state as StateSchema)).toEqual({ username: '123123' })
  })
  test('password filled', () => {
    const state: DeepPartial<StateSchema> = ({ loginForm: { password: '123123' } })
    expect(getLoginState(state as StateSchema)).toEqual({ password: '123123' })
  })
  test('isLoading filled', () => {
    const state: DeepPartial<StateSchema> = ({ loginForm: { isLoading: false } })
    expect(getLoginState(state as StateSchema)).toEqual({ isLoading: false })
  })
  test('state empty', () => {
    const state: DeepPartial<StateSchema> = ({})
    expect(getLoginState(state as StateSchema)).toEqual(initialLodinFormState)
  })
})
