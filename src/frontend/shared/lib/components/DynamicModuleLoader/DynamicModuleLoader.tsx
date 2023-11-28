import { Reducer } from '@reduxjs/toolkit'
import { FC } from 'react'
import { useStore } from 'react-redux'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import { useUnmountEffect } from '@/shared/lib/hooks/useUnmountEffect/useUnmountEffect'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import type { ReduxStoreWithManager, StateSchemaKey } from '@/app/providers/StoreProvider'

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer
}

interface DynamicModuleLoaderProps {
  reducers: ReducersList
  removeAfterUnmount?: boolean;
}

// type ReducersListEntry = [StateSchemaKey, Reducer]

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
  const { reducers, children, removeAfterUnmount = true } = props

  const store = useStore() as ReduxStoreWithManager
  const dispatch = useAppDispatch()

  useMountEffect(() => {
    Object.entries(reducers).forEach(([name, reducer]) => {
      if (store.reducerManager.getReducerMap()[name as StateSchemaKey] === undefined) {
        store.reducerManager.add(name as StateSchemaKey, reducer as Reducer)
        dispatch({ type: `@INIT ${name} reducer` })
      }
    })
  })

  useUnmountEffect(() => {
    if (removeAfterUnmount) {
      Object.entries(reducers).forEach(([name, _]) => {
        store.reducerManager.remove(name as StateSchemaKey)
        dispatch({ type: `@DESTROY ${name} reducer` })
      })
    }
  })

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      { children }
    </>
  )
}
