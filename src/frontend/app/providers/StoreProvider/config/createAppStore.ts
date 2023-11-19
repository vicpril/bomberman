import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom'
// import { counterReducer } from '@/entities/Counter'
import { userReducer } from '@/entities/User'
import { $api, $apiJson } from '@/shared/api/api'
import { createReducerManager } from '../lib/reducerManager'
import type { StateSchema } from './StateSchema'
import { ThunkExtraArgs } from './types'

export const createAppStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: NavigateFunction,
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArgs = {
    api: $api,
    apiJson: $apiJson,
    navigate,
  }

  const store = configureStore({
    reducer: reducerManager.reduce,
    preloadedState: initialState,
    devTools: __IS_DEV__,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: extraArg,
      },
    }),
  })

  // @ts-ignore
  store.reducerManager = reducerManager

  return store
}
