import { createSelector } from '@reduxjs/toolkit'
import { buildSelector } from '@/shared/lib/store'
import { getUserSettings } from './getUserSettings'

export const [useUserSettingsTheme, getUserSettingsTheme] = buildSelector(
    createSelector(getUserSettings, (settings) => settings.theme),
)
