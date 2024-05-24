import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { setFeatureFlags } from '@/shared/lib/features'
import { FeatureFlags } from '@/shared/types/featureFlags'
import { User } from '../../types/user'

interface ResponseUserInitData extends User {
    features?: FeatureFlags
}

export const initUserData = createAsyncThunk<ResponseUserInitData, void, ThunkConfig<string>>(
    'user/fetchUserData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.get<ResponseUserInitData>(`profile/`)
            setFeatureFlags(response.data.features)
            return response.data
        } catch (error) {
            if (axios.isAxiosError<string>(error)) {
                return rejectWithValue(error.response?.data ?? 'Something wrong')
            }
            return rejectWithValue('Something wrong')
        }
    },
)
