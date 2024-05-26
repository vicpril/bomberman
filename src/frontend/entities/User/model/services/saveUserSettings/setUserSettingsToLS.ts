import { USER_SETTINGS_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'
import { UserSettings } from '../../types/settings'
import { getUserSettingsFromLS } from '../../selectors/getUserSettings/getUserSettingsFromLS'

export const setUserSettingsToLS = (value: UserSettings = {}, reset = false) => {
    const newSettings = reset
        ? { ...value }
        : {
              ...getUserSettingsFromLS(),
              ...value,
          }
    localStorage.setItem(USER_SETTINGS_LOCALSTORAGE_KEY, JSON.stringify(newSettings))
}
