import { StateSchema } from '@/app/providers/StoreProvider'
import { getUpdateProfileValidateErrors } from './getUpdateProfileValidateErrors'
import { ValidateProfileErrors } from '../../consts'

describe('getUpdateProfileValidateErrors', () => {
    test('should work with filled state', () => {
        const state: DeepPartial<StateSchema> = {
            profileUpdate: {
                validateErrors: [
                    ValidateProfileErrors.SERVER_ERROR,
                    ValidateProfileErrors.INCORRECT_USER_AGE,
                ],
            },
        }
        expect(getUpdateProfileValidateErrors(state as StateSchema)).toEqual([
            ValidateProfileErrors.SERVER_ERROR,
            ValidateProfileErrors.INCORRECT_USER_AGE,
        ])
    })
    test('should work with filled state', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getUpdateProfileValidateErrors(state as StateSchema)).toEqual(undefined)
    })
})
