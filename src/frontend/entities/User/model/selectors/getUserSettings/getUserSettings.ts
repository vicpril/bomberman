import { buildSelector } from '@/shared/lib/store'
import { UserSettings } from '../../types/settings'

const defaultUserSettings: UserSettings = {}

export const [useGetUserSettings, getUserSettings] = buildSelector(
    (state) => state.user.authData?.settings ?? defaultUserSettings,
)
