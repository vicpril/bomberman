import { Profile } from '@/entities/Profile'

export type ProfileUpdateSchema = Pick<Profile, 'firstname'| 'lastname'> & {
  isLoading?: boolean,
  error?: string
}
