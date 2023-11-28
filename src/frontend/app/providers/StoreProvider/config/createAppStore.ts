import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
// import { NavigateFunction } from 'react-router-dom'
// import { counterReducer } from '@/entities/Counter'
import { userReducer } from '@/entities/User'
import { $api, $apiJson } from '@/shared/api/api'
import { createReducerManager } from '../lib/reducerManager'
import type { StateSchema } from './StateSchema'
import { ThunkExtraArgs } from './types'
import { uiReducer } from '@/features/UI'

export const createAppStore = (
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    ui: uiReducer,
  }

  const reducerManager = createReducerManager(rootReducers)

  const extraArg: ThunkExtraArgs = {
    api: $api,
    apiJson: $apiJson,
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
