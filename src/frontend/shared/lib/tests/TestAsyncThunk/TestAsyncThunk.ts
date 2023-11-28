import { AsyncThunkAction } from '@reduxjs/toolkit'
import axios, { AxiosStatic } from 'axios'
import { StateSchema } from '@/app/providers/StoreProvider'

type ActionCreatorType<Result, Args, RejectedValue>
  = (args: Args) => AsyncThunkAction<Result, Args, { rejectValue: RejectedValue }>

jest.mock('axios')

const mockedAxios = jest.mocked(axios)

export class TestAsyncThunk<Result, Args, RejectedValue> {
  getState: () => StateSchema

  dispatch: jest.MockedFn<any>

  actionCreator: ActionCreatorType<Result, Args, RejectedValue>

  api: jest.MockedFunctionDeep<AxiosStatic>

  apiJson: jest.MockedFunctionDeep<AxiosStatic>

  navigate: jest.Mock<any>

  constructor(
    actionCreator: ActionCreatorType<Result, Args, RejectedValue>,
    responseMock?: object,
    initialState?: DeepPartial<StateSchema>,
  ) {
    this.actionCreator = actionCreator
    this.getState = jest.fn(() => initialState as StateSchema)
    this.dispatch = jest.fn()

    this.api = mockedAxios
    this.apiJson = mockedAxios
    this.navigate = jest.fn()

    if (responseMock) {
      this.api.get.mockResolvedValue(Promise.resolve(responseMock))
      this.api.post.mockResolvedValue(Promise.resolve(responseMock))
      this.api.put.mockResolvedValue(Promise.resolve(responseMock))
      this.api.patch.mockResolvedValue(Promise.resolve(responseMock))
      this.api.delete.mockResolvedValue(Promise.resolve(responseMock))
    }
  }

  async callThunk(args: Args) {
    const action = this.actionCreator(args)

    const result = await action(
      this.dispatch,
      this.getState,
      { api: this.api, navigate: this.navigate, apiJson: this.apiJson },
    )

    return result
  }
}
