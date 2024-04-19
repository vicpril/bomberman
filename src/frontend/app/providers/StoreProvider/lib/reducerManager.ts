import {
  combineReducers, Reducer, ReducersMapObject, Action,
} from '@reduxjs/toolkit'
import { StateSchema, StateSchemaKey } from '../config/StateSchema'

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: Reducer<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
}

export function createReducerManager(initialReducers: ReducersMapObject<StateSchema>): ReducerManager {
  // Create an object which maps keys to reducers
  const reducers = { ...initialReducers }

  // Create the initial combinedReducer
  let combinedReducer = combineReducers(reducers) as Reducer<StateSchema>

  // An array which is used to delete state keys when reducers are removed
  let keysToRemove: StateSchemaKey[] = []

  return {
    getReducerMap: () => reducers,

    // The root reducer function exposed by this object
    // This will be passed to the store
    reduce: (state: StateSchema | undefined, action: Action) => {
      // If any reducers have been removed, clean up their state first
      if (state && keysToRemove.length > 0) {
        state = { ...state }
        keysToRemove.forEach((key) => {
          // @ts-ignore - удаляться будут только асинхронные - они помечены как необязательные в стейте
          delete state?.[key]
        })
        keysToRemove = []
      }

      // Delegate to the combined reducer
      return combinedReducer(state, action)
      // return combinedReducer(state, action)
    },

    // Adds a new reducer with the specified key
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) {
        return
      }

      // Add the reducer to the reducer mapping
      reducers[key] = reducer

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers) as Reducer<StateSchema>
    },

    // Removes a reducer with the specified key
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) {
        return
      }

      // Remove it from the reducer mapping
      delete reducers[key]

      // Add the key to the list of keys to clean up
      keysToRemove.push(key)

      // Generate a new combined reducer
      combinedReducer = combineReducers(reducers) as Reducer<StateSchema>
    },
  }
}
