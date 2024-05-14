import { StateSchema } from '@/app/providers/StoreProvider'

export function isAuthenticated(state: StateSchema) {
    return !!state.user.authData?.id
}
