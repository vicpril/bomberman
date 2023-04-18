import { StateSchema } from '@/app/providers/StoreProvider'
import { initialLodinFormState } from '../../slice/loginSlice'

export const getLoginState = (state: StateSchema) => state.loginForm ?? initialLodinFormState
