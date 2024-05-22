import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'
import { LoginResponseData, UserSchema } from '../types/user'
import { initUserData } from '../services/initUserData/initUserData'

const initialState: UserSchema = {
    authData: null,
    isLoading: false,
}

const logout = (state: UserSchema) => {
    state.authData = null
    localStorage.removeItem(USER_LOCALSTORAGE_KEY)
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<LoginResponseData>) => {
            state.authData = action.payload.user
            localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.accessToken)
        },
        logout,
    },
    extraReducers: (builder) => {
        builder.addCase(initUserData.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(initUserData.fulfilled, (state, { payload }) => {
            state.authData = payload
            state.isLoading = false
        })
        builder.addCase(initUserData.rejected, (state) => {
            state.isLoading = false
            logout(state)
        })
    },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
