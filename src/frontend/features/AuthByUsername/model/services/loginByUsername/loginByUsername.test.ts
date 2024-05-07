// jest.mock('axios')

import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { userActions } from '@/entities/User'
import { loginByUsername } from './loginByUsername'

describe('Service loginByUsername.test', () => {
    test('success login', async () => {
        const remoteMockValue = { username: 'user', id: '1' }

        const thunk = new TestAsyncThunk(loginByUsername, {
            data: remoteMockValue,
        })
        const result = await thunk.callThunk({
            username: 'user',
            password: '123',
        })

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(remoteMockValue))
        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.payload).toEqual(remoteMockValue)
        expect(result.meta.requestStatus).toBe('fulfilled')
    })
})
