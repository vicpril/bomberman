import { ThunkConfig } from '@/app/providers/StoreProvider'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { userActions } from '../../slice/userSlice'

export const callApiLogout = createAsyncThunk<void, void, ThunkConfig<string>>(
    'user/logout',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, dispatch } = thunkApi
        try {
            await extra.api.post('logout/')
            dispatch(userActions.logout())
        } catch (error) {
            if (axios.isAxiosError<string>(error)) {
                return rejectWithValue(error.response?.data ?? 'Something wrong')
            }
            return rejectWithValue('Something wrong')
        }
    },
)
