import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { LoginSchema } from '../types/loginSchema'
import { loginByUsername } from '../services/loginByUsername/loginByUsername'

export const initialLodinFormState: LoginSchema = {
    username: '',
    password: '',
    isLoading: false,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState: initialLodinFormState,
    reducers: {
        setLoginUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setLoginPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginByUsername.pending, (state) => {
            state.error = undefined
            state.isLoading = true
        })
        builder.addCase(loginByUsername.fulfilled, (state) => {
            state.isLoading = false
        })
        builder.addCase(loginByUsername.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
