import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Currency } from '@/entities/Currency'
import { Country } from '@/entities/Country'
import { ProfileUpdateFormFields, ProfileUpdateSchema } from '../../types/ProfileUpdateSchema'
import { updateProfileData } from '../../services/updateProfileData/updateProfileData'

export const initialProfileUpdateState: ProfileUpdateSchema = {
  form: {
    firstname: '',
    lastname: '',
    age: undefined,
    avatar: '',
    country: Country.Russia,
    currency: Currency.RUB,
  },
  isLoading: false,
  error: undefined,
  validateErrors: undefined,
}

export const profileUpdateSlice = createSlice({
  name: 'profile/update',
  initialState: initialProfileUpdateState,
  reducers: {
    updateProfileForm: (state, action: PayloadAction<Partial<ProfileUpdateFormFields>>) => {
      state.form = { ...state.form, ...action.payload }
    },
  },
  extraReducers(builder) {
    builder.addCase(updateProfileData.pending, (state) => {
      state.isLoading = true
      state.validateErrors = undefined
    })
    builder.addCase(updateProfileData.fulfilled, (state, action) => {
      state.isLoading = false
      state.form = action.payload
    })
    builder.addCase(updateProfileData.rejected, (state, action) => {
      state.isLoading = false
      state.validateErrors = action.payload
    })
  },
})

export const { actions: profileUpdateActions } = profileUpdateSlice
export const { reducer: profileUpdateReducer } = profileUpdateSlice
