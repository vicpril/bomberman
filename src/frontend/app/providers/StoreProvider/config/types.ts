import { EnhancedStore } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { NavigateFunction } from 'react-router-dom'
import { StateSchema } from './StateSchema'
import { createAppStore } from './createAppStore'
import { createReducerManager } from '../lib/reducerManager'

export type ReducerManager = ReturnType<typeof createReducerManager>

type ReduxStoreType = EnhancedStore<StateSchema>

export interface ReduxStoreWithManager extends ReduxStoreType {
  reducerManager: ReducerManager
}

export type AppDispatch = ReturnType<typeof createAppStore>['dispatch']

export interface ThunkExtraArgs {
  api: AxiosInstance,
  apiJson: AxiosInstance,
  navigate?: NavigateFunction
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArgs,
  state: StateSchema,
}
