import { buildAsyncThunk } from '@/shared/lib/store'
import {
    getArticlesPageHasMore,
    getArticlesPageIsLoading,
    getArticlesPageNum,
} from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

export const { useAsyncThunk: useFetchNextArticlesPage, asyncThunk: fetchNextArticlesPage } = buildAsyncThunk<
    void,
    void,
    string
>('articlesPage/fetchNextArticlesPage', async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi
    const hasMore = getArticlesPageHasMore(getState())
    const page = getArticlesPageNum(getState())
    const isLoading = getArticlesPageIsLoading(getState())

    if (hasMore && !isLoading) {
        dispatch(articlesPageActions.setPage(page + 1))
        dispatch(fetchArticlesList())
    }
})
