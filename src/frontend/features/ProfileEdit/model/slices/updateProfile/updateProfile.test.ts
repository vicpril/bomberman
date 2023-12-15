import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { Profile } from '@/entities/Profile'
import { profileUpdateActions, profileUpdateReducer } from './updateProfile'
import { ProfileUpdateSchema } from '../../types/ProfileUpdateSchema'
import { ValidateProfileErrors } from '../../consts'
import { updateProfileData } from '../../services/updateProfileData/updateProfileData'

const data: Profile = {
  id: 1,
  username: 'user1',
  firstname: 'Vic',
  lastname: 'Pr',
  age: 20,
  avatar: 'https://robohash.org/EJ7.png?set=set1&size=150x150',
  country: Country.Russia,
  currency: Currency.RUB,
}

describe('updateProfile.test', () => {
  test('test update profile', () => {
    const state: DeepPartial<ProfileUpdateSchema> = {
      form: { firstname: '123' },
    }
    expect(
      profileUpdateReducer(state as ProfileUpdateSchema, profileUpdateActions.updateProfileForm({ firstname: '123456' })),
    )
      .toEqual({ form: { firstname: '123456' } })
  })

  test('test update profile service pending', () => {
    const state: DeepPartial<ProfileUpdateSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileErrors.SERVER_ERROR],
    }
    expect(
      profileUpdateReducer(state as ProfileUpdateSchema, updateProfileData.pending),
    )
      .toEqual({ isLoading: true, validateErrors: undefined })
  })

  test('test update profile service fullfiled', () => {
    const state: DeepPartial<ProfileUpdateSchema> = {
      isLoading: true,
    }
    expect(
      profileUpdateReducer(state as ProfileUpdateSchema, updateProfileData.fulfilled(data, '', { data, id: '1' })),
    )
      .toEqual({
        isLoading: false,
        validateErrors: undefined,
        form: data,
      })
  })
})
