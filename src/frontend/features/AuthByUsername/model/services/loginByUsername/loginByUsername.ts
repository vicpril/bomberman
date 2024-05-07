import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { User, userActions } from '@/entities/User'
import { ThunkConfig } from '@/app/providers/StoreProvider'

interface LoginByUsernameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi
        try {
            const response = await extra.api.post<User>('login/', authData)

            dispatch(userActions.setAuthData(response.data))

            return response.data
        } catch (error) {
            if (axios.isAxiosError<string>(error)) {
                return rejectWithValue(error.response?.data ?? 'Something wrong')
            }
            return rejectWithValue('Something wrong')
        }
    },
)
