import { Profile } from '@/entities/Profile'
import { ValidateProfileErrors } from '../consts'

export type ProfileUpdateFormFields = Omit<Profile, 'id' | 'username'>

export interface ProfileUpdateSchema {
  form: ProfileUpdateFormFields,
  isLoading?: boolean,
  error?: string
  validateErrors?: ValidateProfileErrors[]
}
