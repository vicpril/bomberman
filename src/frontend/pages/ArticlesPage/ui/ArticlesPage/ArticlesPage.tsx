import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleList, ArticleView } from '@/entities/Article'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import { Page } from '@/widgets/Page'
import { ArticlesFilters } from '@/features/ArticlesFilters'
import { articlesPageReducer, getArticles, useArticlesActions } from '../../model/slices/articlesPageSlice'
import {
  useArticlesPageIsLoading,
  useArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'
import { useFetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { useInitArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import cls from './ArticlesPage.module.scss'
import { useFetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props

  const articles = useSelector(getArticles.selectAll)
  const isLoading = useArticlesPageIsLoading()
  const view = useArticlesPageView()

  const [searchParams] = useSearchParams()

  const { setPage, setView } = useArticlesActions()

  const initArticlesPage = useInitArticlesPage()
  const fetchNextArticlesPage = useFetchNextArticlesPage()
  const fetchArticlesList = useFetchArticlesList()

  const onLoadNextPart = () => {
    fetchNextArticlesPage()
  }

  useMountEffect(() => {
    initArticlesPage(searchParams)
  })

  const onViewChange = (view: ArticleView) => {
    setView(view)
  }

  const onFiltersChange = () => {
    setPage(1)
    fetchArticlesList({ replace: true })
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>

      <Page
        className={classNames(cls.ArticlesPage, {}, [className])}
        onScrollEnd={onLoadNextPart}
        saveScroll
        data-testid="ArticlesPage"
      >
        <ArticlesFilters
          view={view}
          onViewChange={onViewChange}
          onChange={onFiltersChange}
        />
        <ArticleList
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
      </Page>
    </DynamicModuleLoader>

  )
}

export default ArticlesPage
