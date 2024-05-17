import { StateSchema } from '@/app/providers/StoreProvider'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { getProfileData } from './getProfileData'
import { Profile } from '../../types/profile'

const mockProfile: Profile = {
    id: '1',
    username: 'user1',
    firstname: 'Vic',
    lastname: 'Pr',
    age: 20,
    avatar: 'https://robohash.org/EJ7.png?set=set1&size=150x150',
    country: Country.Russia,
    currency: Currency.RUB,
}

const state: DeepPartial<StateSchema> = {
    profile: {
        data: mockProfile,
    },
}

describe('getProfileData.test', () => {
    test('get firstname', () => {
        expect(getProfileData(state as StateSchema)?.firstname).toEqual(mockProfile.firstname)
    })
    test('get lastname', () => {
        expect(getProfileData(state as StateSchema)?.lastname).toEqual(mockProfile.lastname)
    })
    test('get age', () => {
        expect(getProfileData(state as StateSchema)?.age).toEqual(mockProfile.age)
    })
    test('get avatar', () => {
        expect(getProfileData(state as StateSchema)?.avatar).toEqual(mockProfile.avatar)
    })
    test('get country', () => {
        expect(getProfileData(state as StateSchema)?.country).toEqual(mockProfile.country)
    })
    test('get currency', () => {
        expect(getProfileData(state as StateSchema)?.currency).toEqual(mockProfile.currency)
    })
})
