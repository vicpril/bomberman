import { Country } from '@/entities/Country'
import { validateProfileData } from './validateProfileData'
import { Currency } from '@/entities/Currency'
import { ValidateProfileErrors } from '../../consts'
import { Profile } from '@/entities/Profile'

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

describe('validateProfileData.test', () => {
  test('success', () => {
    const result = validateProfileData(data)
    expect(result).toEqual([])
  })

  test('without first and last name', () => {
    const result = validateProfileData({ ...data, firstname: '', lastname: '' })
    expect(result).toEqual([
      ValidateProfileErrors.INCORRECT_USER_DATA,
    ])
  })

  test('incorrect age', () => {
    const result = validateProfileData({ ...data, age: undefined })
    expect(result).toEqual([
      ValidateProfileErrors.INCORRECT_USER_AGE,
    ])
  })
  test('incorrect country', () => {
    const result = validateProfileData({ ...data, country: undefined })
    expect(result).toEqual([
      ValidateProfileErrors.INCORRECT_USER_COUNTRY,
    ])
  })
  test('incorrect all', () => {
    const result = validateProfileData({} as Profile)
    expect(result).toEqual([
      ValidateProfileErrors.INCORRECT_USER_DATA,
      ValidateProfileErrors.INCORRECT_USER_AGE,
      ValidateProfileErrors.INCORRECT_USER_COUNTRY,
    ])
  })
})
