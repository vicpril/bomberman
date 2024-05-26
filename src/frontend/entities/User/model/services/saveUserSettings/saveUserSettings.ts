import { buildAsyncThunk } from '@/shared/lib/store'
import axios from 'axios'
import { UserSettings } from '../../types/settings'
import { getUserSettings } from '../../selectors/getUserSettings/getUserSettings'
import { getAccessToken } from '../../selectors/getAccessToken/getAccessToken'

export const { useAsyncThunk: useSaveUserSettings, asyncThunk: saveUserSettings } = buildAsyncThunk<
    UserSettings,
    UserSettings,
    string
>('user/saveUserSettings', async (newSettings, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi

    try {
        const token = getAccessToken()
        const currentSettings = getUserSettings(getState())

        if (token) {
            // Авторизован
            const response = await extra.api.put<UserSettings>('settings/', {
                ...currentSettings,
                ...newSettings,
            })

            return response.data
        }

        return { ...newSettings }
    } catch (error) {
        if (axios.isAxiosError<string>(error)) {
            return rejectWithValue(error.response?.data ?? 'Something wrong')
        }
        return rejectWithValue('Something wrong')
    }
})
