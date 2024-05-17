import { StateSchema } from '@/app/providers/StoreProvider'

export const isAuthenticated = (state: StateSchema) => !!state.user.authData?.id
