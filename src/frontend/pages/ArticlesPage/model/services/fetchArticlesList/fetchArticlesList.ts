import axios from 'axios'
import { Article, ArticleType } from '@/entities/Article'
import {
    getArticlesFilterOrder,
    getArticlesFilterSearch,
    getArticlesFilterSort,
    getArticlesFilterType,
} from '@/features/ArticlesFilters'
import { addQueryParams } from '@/shared/lib/url/addQueryParams'
import { buildAsyncThunk } from '@/shared/lib/store'
import { getArticlesPageLimit, getArticlesPageNum } from '../../selectors/articlesPageSelectors'

interface FetchArticlesListProps {
    replace?: boolean
}

export const { useAsyncThunk: useFetchArticlesList, asyncThunk: fetchArticlesList } = buildAsyncThunk<
    Article[],
    FetchArticlesListProps | undefined,
    string
>('articles/fetchArticlesList', async (_props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi

    const page = getArticlesPageNum(getState())
    const limit = getArticlesPageLimit(getState())
    const order = getArticlesFilterOrder(getState())
    const sort = getArticlesFilterSort(getState())
    const search = getArticlesFilterSearch(getState())
    const type = getArticlesFilterType(getState())

    try {
        addQueryParams({
            sort,
            order,
            search,
            type,
        })
        const response = await extra.apiJson.get<Article[]>('/articles', {
            params: {
                _page: page,
                _limit: limit,
                _expand: 'user',
                _order: order,
                _sort: sort,
                type: type === ArticleType.ALL ? undefined : type,
                q: search,
            },
        })

        return response.data
    } catch (error) {
        if (axios.isAxiosError<string>(error)) {
            return rejectWithValue(error.response?.data || 'Something wrong')
        }
        return rejectWithValue('Something wrong')
    }
})
