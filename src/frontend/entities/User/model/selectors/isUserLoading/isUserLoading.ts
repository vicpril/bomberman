import { StateSchema } from '@/app/providers/StoreProvider'
import { buildSelector } from '@/shared/lib/store'

export const [useUserLoading, isUserLoading] = buildSelector((state: StateSchema) => state.user.isLoading)
