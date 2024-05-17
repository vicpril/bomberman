import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { fetchProfileData } from './fetchProfileData'
import { Profile } from '../../types/profile'

describe('Service fetchProfileData.test', () => {
    test('success fetching', async () => {
        const remoteMockValue: Profile = {
            age: 22,
            avatar: '',
            id: '1',
            username: 'user1',
            firstname: 'firstname',
            lastname: 'lastname',
        }

        const thunk = new TestAsyncThunk(fetchProfileData, {
            data: remoteMockValue,
        })
        const result = await thunk.callThunk('1')

        expect(thunk.api.get).toHaveBeenCalled()
        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(result.payload).toEqual(remoteMockValue)
        expect(result.meta.requestStatus).toBe('fulfilled')
    })
})
