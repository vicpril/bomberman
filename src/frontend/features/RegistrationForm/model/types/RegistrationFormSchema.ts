import { Profile } from '@/entities/Profile'
import { ValidateRegistrationErrors } from '../consts'

export type RegistrationFormFields = Pick<Profile, 'username' | 'firstname' | 'lastname'> & {
    password: string
}

export interface RegistrationFormSchema {
    form: RegistrationFormFields
    isLoading?: boolean
    error?: string
    validateErrors?: ValidateRegistrationErrors[]
}
