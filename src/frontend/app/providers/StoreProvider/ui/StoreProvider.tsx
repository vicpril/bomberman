import { ReducersMapObject } from '@reduxjs/toolkit'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { NavigateFunction } from 'react-router-dom'
import { StateSchema } from '../config/StateSchema'
import { createAppStore } from '../config/createAppStore'

interface StoreProviderProps {
  children?: ReactNode
  initialState?: DeepPartial<StateSchema>
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
  navigate?: NavigateFunction
}
export const StoreProvider = (props: StoreProviderProps) => {
  const {
    children,
    initialState,
    asyncReducers,
    navigate,
  } = props

  const store = createAppStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
    navigate,
  )

  return (
    <Provider store={store}>
      {children}
    </Provider>

  )
}
