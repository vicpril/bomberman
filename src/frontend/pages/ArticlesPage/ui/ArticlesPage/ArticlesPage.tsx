import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import { ArticleList, ArticleView } from '@/entities/Article'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'
import { Page } from '@/widgets/Page/Page'
import {
  fetchNextArticlesPage,
} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { ArticlesFilters } from '@/features/ArticlesFilters'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props

  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const view = useSelector(getArticlesPageView)
  const [searchParams] = useSearchParams()

  const dispatch = useAppDispatch()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useMountEffect(() => {
    dispatch(initArticlesPage(searchParams))
  })

  const onViewChange = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
  }, [dispatch])

  const onFiltersChange = useCallback(() => {
    dispatch(articlesPageActions.setPage(1))
    dispatch(fetchArticlesList({ replace: true }))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>

      <Page
        className={classNames(cls.ArticlesPage, {}, [className])}
        onScrollEnd={onLoadNextPart}
        saveScroll
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
