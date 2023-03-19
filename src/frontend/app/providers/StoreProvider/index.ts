import { StoreProvider } from './ui/StoreProvider'
import type { StateSchema, AppDispatch, ThunkConfig } from './config/StateSchema'
import { createReduxStore } from './config/store'

export {
  StoreProvider,
  StateSchema,
  AppDispatch,
  createReduxStore,
  ThunkConfig,
}
