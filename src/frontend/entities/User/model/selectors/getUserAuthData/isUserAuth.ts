import { StateSchema } from '@/app/providers/StoreProvider'

export const isUserAuth = (state: StateSchema) => !!state.user.authData?.id
