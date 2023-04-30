import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ProfileUpdateSchema } from '../../types/ProfileUpdateSchema'
import { updateProfileData } from '../../services/updateProfileData/updateProfileData'

export const initialProfileUpdateState: ProfileUpdateSchema = {
  firstname: '',
  lastname: '',
  isLoading: false,
  error: undefined,
}

export const profileUpdateSlice = createSlice({
  name: 'profile/update',
  initialState: initialProfileUpdateState,
  reducers: {
    setFirstname: (state, action: PayloadAction<string>) => {
      state.firstname = action.payload
    },
    setLastname: (state, action: PayloadAction<string>) => {
      state.lastname = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(updateProfileData.pending, (state) => {
      state.isLoading = true
      state.error = undefined
    })
    builder.addCase(updateProfileData.fulfilled, (state, action) => {
      state.isLoading = false
      state.firstname = action.payload.firstname
      state.lastname = action.payload.lastname
    })
    builder.addCase(updateProfileData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })
  },
})

export const { actions: profileUpdateActions } = profileUpdateSlice
export const { reducer: profileUpdateReducer } = profileUpdateSlice
