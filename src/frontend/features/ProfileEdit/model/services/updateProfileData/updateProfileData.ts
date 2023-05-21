import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Profile } from '@/entities/Profile'
import { ProfileUpdateFormFields, ValidateProfileErrors } from '../../types/ProfileUpdateSchema'
import { validateProfileData } from '../validateProfileData/validateProfileData'

interface ProfileUpdateProps {
  id: number,
  data: ProfileUpdateFormFields
}

export const updateProfileData = createAsyncThunk<
  Profile,
  ProfileUpdateProps,
  ThunkConfig<ValidateProfileErrors[]>
>(
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
      if (axios.isAxiosError<string>(error)) {
        // return rejectWithValue(error.response?.data ?? 'Something wrong')
        return rejectWithValue([ValidateProfileErrors.SERVER_ERROR])
      }
      return rejectWithValue([ValidateProfileErrors.SERVER_ERROR])
    }
  },
)
