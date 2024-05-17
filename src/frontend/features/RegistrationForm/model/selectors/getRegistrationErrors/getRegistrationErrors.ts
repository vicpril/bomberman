import { StateSchema } from '@/app/providers/StoreProvider'

export const getRegistrationErrors = (state: StateSchema) => state.registrationForm?.validateErrors
