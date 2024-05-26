import { USER_SETTINGS_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'
import { UserSettings } from '../../types/settings'

export const getUserSettingsFromLS = (): UserSettings | null => {
    const value = localStorage.getItem(USER_SETTINGS_LOCALSTORAGE_KEY)
    return value ? JSON.parse(value) : null
}
