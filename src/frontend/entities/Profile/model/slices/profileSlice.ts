import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Profile, ProfileSchema } from '../types/profile'
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData'

const initialState: ProfileSchema = {
    data: undefined,
    isLoading: false,
    readonly: false,
    error: undefined,
}

export const profileSclice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateData: (state, action: PayloadAction<Profile>) => {
            state.data = action.payload
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchProfileData.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(fetchProfileData.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
        builder.addCase(fetchProfileData.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = undefined
            state.data = action.payload
        })
    },
})

export const { actions: profileActions } = profileSclice
export const { reducer: profileReducer } = profileSclice
