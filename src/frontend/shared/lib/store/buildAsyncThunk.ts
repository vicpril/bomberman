import { ThunkConfig } from '@/app/providers/StoreProvider'
import {
  AsyncThunkOptions, AsyncThunkPayloadCreator, bindActionCreators, createAsyncThunk,
} from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useAppDispatch } from '../hooks/useAppDispatch/useAppDispatch'

export const buildAsyncThunk = <Returned, ThunkArg, RejectedType>(
  typePrefix: string,
  payloadCreator: AsyncThunkPayloadCreator<Returned, ThunkArg, ThunkConfig<RejectedType>>,
  options?: AsyncThunkOptions<ThunkArg, ThunkConfig<RejectedType>>,
) => {
  const asyncThunk = createAsyncThunk<
  Returned,
  ThunkArg,
  ThunkConfig<RejectedType>
  >(typePrefix, payloadCreator, options)

  const useAsyncThunk = () => {
    const dispatch = useAppDispatch()

    return useMemo(
      () => bindActionCreators(asyncThunk, dispatch),
      [dispatch],
    )
  }

  return { useAsyncThunk, asyncThunk }
}
