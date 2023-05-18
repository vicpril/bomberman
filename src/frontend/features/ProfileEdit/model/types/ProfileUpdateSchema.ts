import { Profile } from '@/entities/Profile'

export type ProfileUpdateFormFields = Omit<Profile, 'id' | 'username'>

export interface ProfileUpdateSchema {
  form: ProfileUpdateFormFields,
  isLoading?: boolean,
  error?: string
  validateErrors?: ValidateProfileErrors[]
}

export enum ValidateProfileErrors {
  NO_DATA = 'NO_DATA',
  INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
  INCORRECT_USER_AGE = 'INCORRECT_USER_AGE',
  INCORRECT_USER_COUNTRY = 'INCORRECT_USER_COUNTRY',
  SERVER_ERROR = 'SERVER_ERROR',
}
