import { ProfileUpdateFormFields } from '../../types/ProfileUpdateSchema'
import { ValidateProfileErrors } from '../../consts'

export const validateProfileData = (profile?: ProfileUpdateFormFields): ValidateProfileErrors[] => {
  if (!profile) {
    return [ValidateProfileErrors.NO_DATA]
  }

  const {
    firstname, lastname, age, country,
  } = profile

  const errors: ValidateProfileErrors[] = []

  if (!firstname || !lastname) {
    errors.push(ValidateProfileErrors.INCORRECT_USER_DATA)
  }

  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileErrors.INCORRECT_USER_AGE)
  }

  if (!country) {
    errors.push(ValidateProfileErrors.INCORRECT_USER_COUNTRY)
  }

  return errors
}
