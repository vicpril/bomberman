import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import { Profile } from '@/entities/Profile'

interface ProfileUpdateProps {
  id: number,
  data: Pick<Profile, 'firstname' | 'lastname'>
}

export const updateProfileData = createAsyncThunk<
  Profile,
  ProfileUpdateProps,
  ThunkConfig<string>
>(
  'profile/update',
  async (props, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi

    try {
      const response = await extra.api.patch<Profile>(`users/${props.id}/`, props.data)

      return response.data
    } catch (error) {
      if (axios.isAxiosError<string>(error)) {
        return rejectWithValue(error.response?.data ?? 'Something wrong')
      }
      return rejectWithValue('Something wrong')
    }
  },
)
