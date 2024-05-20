import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Profile } from '@/entities/Profile'
import { ResponseErrorData } from '@/shared/types/api'
import { ApiErrorCode } from '@/shared/const/errors'
import { ProfileErrors, ProfileUpdateFormFields } from '../../types/ProfileUpdateSchema'
import { validateProfileData } from '../validateProfileData/validateProfileData'

interface ProfileUpdateProps {
    id: string
    data: ProfileUpdateFormFields
}

export const updateProfileData = createAsyncThunk<Profile, ProfileUpdateProps, ThunkConfig<ProfileErrors[]>>(
    'profile/update',
    async (props, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi

        const errors = validateProfileData(props.data)

        if (errors.length) {
            return rejectWithValue(errors)
        }

        try {
            const response = await extra.api.put<Profile>(`users/${props.id}/`, props.data)

            return response.data
        } catch (error) {
            if (axios.isAxiosError<ResponseErrorData>(error) && error.response) {
                return rejectWithValue([error.response.data.code, ...(error.response.data.errors ?? [])])
            }
            return rejectWithValue([ApiErrorCode.SERVER_ERROR])
        }
    },
)
