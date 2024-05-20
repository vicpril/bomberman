import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { User } from '../../types/user'
import { userActions } from '../../slice/userSlice'

export const initUserData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/fetchUserData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI

        try {
            const response = await extra.api.get<User>(`profile/`)
            return response.data
        } catch (error) {
            dispatch(userActions.logout())

            if (axios.isAxiosError<string>(error)) {
                return rejectWithValue(error.response?.data ?? 'Something wrong')
            }
            return rejectWithValue('Something wrong')
        }
    },
)
