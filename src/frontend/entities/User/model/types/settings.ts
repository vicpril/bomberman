import { Theme } from '@/shared/context/ThemeContext'

export interface UserSettings {
    theme?: Theme
    language?: 'en' | 'ru'
}
