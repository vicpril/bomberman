import { EnhancedStore } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { NavigateFunction } from 'react-router-dom'
// import type { CounterSchema } from '@/entities/Counter'
// import { ProfileSchema } from '@/entities/Profile'
// import type { UserSchema } from '@/entities/User'
import type { LoginSchema } from '@/features/AuthByUsername'
import { createReducerManager } from './reducerManager'
import { createReduxStore } from './store'
import { UserSchema } from '@/entities/User'
import { ProfileSchema } from '@/entities/Profile'
import { ProfileUpdateSchema } from '@/features/ProfileEdit'

export interface StateSchema {
  user: UserSchema,

  // асинхронные
  loginForm?: LoginSchema
  profile?: ProfileSchema
  profileUpdate?: ProfileUpdateSchema
}

export type StateSchemaKey = keyof StateSchema

export type ReducerManager = ReturnType<typeof createReducerManager>

type ReduxStoreType = EnhancedStore<StateSchema>

export interface ReduxStoreWithManager extends ReduxStoreType {
  reducerManager: ReducerManager
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']

export interface ThunkExtraArgs {
  api: AxiosInstance,
  navigate?: NavigateFunction
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArgs,
  state: StateSchema,
}
