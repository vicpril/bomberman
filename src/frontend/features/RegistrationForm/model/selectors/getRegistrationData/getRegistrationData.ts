import { StateSchema } from '@/app/providers/StoreProvider'
import { initialRegistrationState } from '../../slices/RegistrationFormSlice'

export const getRegistrationData = (state: StateSchema) => state.registrationForm ?? initialRegistrationState
