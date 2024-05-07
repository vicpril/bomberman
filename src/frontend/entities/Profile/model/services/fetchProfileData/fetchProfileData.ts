import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Profile } from '../../types/profile'

type ProfileId = string

export const fetchProfileData = createAsyncThunk<Profile, ProfileId, ThunkConfig<string>>(
    'profile/fetchProfile',
    async (userId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI

        try {
            const response = await extra.api.get<Profile>(`users/${userId}/`)
            return response.data
        } catch (error) {
            if (axios.isAxiosError<string>(error)) {
                return rejectWithValue(error.response?.data ?? 'Something wrong')
            }
            return rejectWithValue('Something wrong')
        }
    },
)
