import { Profile } from '@/entities/Profile'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import axios from 'axios'
import { RegistrationFormFields } from '../types/RegistrationFormSchema'
import { ValidateRegistrationErrors } from '../consts'
import { validateRegistrationData } from './validateRegistrationData'

export const registration = createAsyncThunk<
    Profile,
    RegistrationFormFields,
    ThunkConfig<ValidateRegistrationErrors[]>
>('registration/registrationByUsername', async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    const errors = validateRegistrationData(props)

    if (errors.length) {
        return rejectWithValue(errors)
    }

    try {
        const response = await extra.api.post<Profile>('registration/', props)

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
