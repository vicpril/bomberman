import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RegistrationFormFields, RegistrationFormSchema } from '../types/RegistrationFormSchema'
import { registration } from '../services/registration'

export const initialRegistrationState: RegistrationFormSchema = {
    form: {
        username: '',
        lastname: '',
        firstname: '',
    },
    isLoading: false,
    error: undefined,
    validateErrors: undefined,
}

export const RegistrationFormSlice = createSlice({
    name: 'RegistrationForm',
    initialState: initialRegistrationState,
    reducers: {
        updateRegistrationForm: (state, action: PayloadAction<Partial<RegistrationFormFields>>) => {
            state.form = { ...state.form, ...action.payload }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.pending, (state) => {
                state.isLoading = true
                state.validateErrors = undefined
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.isLoading = false
                state.form = action.payload
            })
            .addCase(registration.rejected, (state, action) => {
                state.isLoading = false
                state.validateErrors = action.payload
            })
    },
})

export const { actions: registrationFormActions } = RegistrationFormSlice
export const { reducer: registrationFormReducer } = RegistrationFormSlice
