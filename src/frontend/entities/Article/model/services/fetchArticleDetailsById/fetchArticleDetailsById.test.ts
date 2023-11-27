import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { Article } from '../../types/article'
import { fetchArticleDetailsById } from './fetchArticleDetailsById'

describe('fetchArticleDetailsById.test', () => {
  test('success fetching', async () => {
    const remoteMockValue: Article = {
      id: '1',
      title: 'string',
      subtitle: 'string',
      img: 'string',
      views: 0,
      createdAt: 'string',
      type: [],
      blocks: [],
      user: {
        id: '1',
        username: 'Ulbi tv',
      },
    }
    const thunk = new TestAsyncThunk(fetchArticleDetailsById, {
      data: remoteMockValue,
    })

    const result = await thunk.callThunk(1)

    expect(thunk.api.get).toHaveBeenCalled()
    expect(thunk.dispatch).toHaveBeenCalledTimes(2)
    expect(result.payload).toEqual(remoteMockValue)
    expect(result.meta.requestStatus).toBe('fulfilled')
  })
})
