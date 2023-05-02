import { Profile } from '@/entities/Profile'

export type ProfileUpdateFormFields = Omit<Profile, 'id' | 'username'>

export interface ProfileUpdateSchema {
  form: ProfileUpdateFormFields,
  isLoading?: boolean,
  error?: string
}
