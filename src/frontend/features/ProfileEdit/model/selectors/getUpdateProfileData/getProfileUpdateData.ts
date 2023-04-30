import { StateSchema } from '@/app/providers/StoreProvider'
import { initialProfileUpdateState } from '../../slices/updateProfile/updateProfile'

export const getProfileUpdateData = (state: StateSchema) => state.profileUpdate ?? initialProfileUpdateState
