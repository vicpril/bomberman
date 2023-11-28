import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import { ArticleList, ArticleView, ArticlesViewSelector } from '@/entities/Article'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import {
  getArticlesPageInited,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'
import { Page } from '@/widgets/Page/Page'
import {
  fetchNextArticlesPage,
} from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'

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

  const inited = useSelector(getArticlesPageInited)

  const dispatch = useAppDispatch()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useMountEffect(() => {
    dispatch(initArticlesPage())
  })

  const onViewChange = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view))
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>

      <Page
        className={classNames(cls.ArticlesPage, {}, [className])}
        onScrollEnd={onLoadNextPart}
      >
        <ArticlesViewSelector
          view={view}
          onViewChange={onViewChange}
        />
        <ArticleList
          className={cls.list}
          isLoading={isLoading}
          view={view}
          articles={articles}
        />
      </Page>
    </DynamicModuleLoader>

  )
}

export default ArticlesPage
