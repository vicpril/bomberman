import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import axios from 'axios'
import { LoginResponseData } from '@/entities/User'
import { RegistrationFormFields } from '../types/RegistrationFormSchema'
import { ValidateRegistrationErrors } from '../consts'
import { validateRegistrationData } from './validateRegistrationData'

export const registration = createAsyncThunk<
    LoginResponseData,
    RegistrationFormFields,
    ThunkConfig<ValidateRegistrationErrors[]>
>('registration/registrationByUsername', async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    const errors = validateRegistrationData(props)

    if (errors.length) {
        return rejectWithValue(errors)
    }

    try {
        const response = await extra.api.post<LoginResponseData>('registration/', props)

        return response.data
    } catch (error) {
        if (axios.isAxiosError<ValidateRegistrationErrors>(error)) {
            return Object.values(ValidateRegistrationErrors).includes(
                error.response?.data as ValidateRegistrationErrors,
            )
                ? rejectWithValue([error.response?.data as ValidateRegistrationErrors])
                : rejectWithValue([ValidateRegistrationErrors.SERVER_ERROR])
        }
        return rejectWithValue([ValidateRegistrationErrors.SERVER_ERROR])
    }
})
