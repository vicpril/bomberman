import { Profile } from '@/entities/Profile'
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { updateProfileData } from './updateProfileData'

describe('Service updateProfileData.test', () => {
    test('success fetching', async () => {
        const remoteMockValue: Profile = {
            id: 1,
            username: 'user1',
            firstname: 'Vic',
            lastname: 'Pr',
            age: 20,
            avatar: 'https://robohash.org/EJ7.png?set=set1&size=150x150',
            country: Country.Russia,
            currency: Currency.RUB,
        }

        const thunk = new TestAsyncThunk(updateProfileData, {
            data: remoteMockValue,
        })
        const result = await thunk.callThunk({ data: remoteMockValue, id: '1' })

        expect(thunk.api.put).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(remoteMockValue)
    })
})
