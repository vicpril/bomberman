import { ValidateRegistrationErrors } from '../consts'
import { RegistrationFormFields } from '../types/RegistrationFormSchema'

export const validateRegistrationData = (data?: RegistrationFormFields) => {
    const errors: ValidateRegistrationErrors[] = []

    if (!data?.username) {
        errors.push(ValidateRegistrationErrors.INCORRECT_USERNAME)
    }

    return errors
}
