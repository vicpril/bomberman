import { Profile } from '@/entities/Profile'
import { ApiErrorCode } from '@/shared/const/errors'
import { ValidateProfileErrors } from '../consts'

export type ProfileUpdateFormFields = Omit<Profile, 'id' | 'username'>

export type ProfileErrors = ApiErrorCode | ValidateProfileErrors

export interface ProfileUpdateSchema {
    form: ProfileUpdateFormFields
    isLoading?: boolean
    error?: string
    validateErrors?: ProfileErrors[]
}
