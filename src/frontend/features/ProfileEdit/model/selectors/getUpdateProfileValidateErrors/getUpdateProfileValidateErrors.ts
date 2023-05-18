import { StateSchema } from '@/app/providers/StoreProvider'

export const getUpdateProfileValidateErrors = (state: StateSchema) => state.profileUpdate?.validateErrors
