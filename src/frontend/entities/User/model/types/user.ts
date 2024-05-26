import { UserRoles } from '@/shared/const/UserRoles'
import { UserSettings } from './settings'

export interface User {
    id: string
    username: string
    avatar?: string
    roles?: UserRoles[]
    settings?: UserSettings
}

export interface UserSchema {
    authData: User | null
    isLoading: boolean
}

export interface LoginResponseData {
    accessToken: string
    user: User
}
