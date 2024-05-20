import { StateSchema } from '@/app/providers/StoreProvider'

export const isUserLoading = (state: StateSchema) => state.user.isLoading
