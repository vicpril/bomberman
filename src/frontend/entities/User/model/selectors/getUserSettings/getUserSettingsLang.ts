import { createSelector } from '@reduxjs/toolkit'
import { buildSelector } from '@/shared/lib/store'
import { getUserSettings } from './getUserSettings'

export const [useUserSettingsLang, getUserSettingsLang] = buildSelector(
    createSelector(getUserSettings, (settings) => settings.language),
)
