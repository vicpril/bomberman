import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useCallback, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesDetailPage.module.scss'
import { ArticleDetails, ArticleList } from '@/entities/Article'
import { CommentList } from '@/entities/Comment'
import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import {
  getArticleComments,
} from '../../model/slices/articleDetailsCommentsSlice'
import {
  getArticleDetailsIsLoading,
} from '@/entities/Article/model/selectors/getArticleDetails/getArticleDetails'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Text, TextSize } from '@/shared/ui/Text/Text'
import { AddCommentForm } from '@/features/AddCommentForm'
import { addCommentsByArticleId } from '../../model/services/addCommentsByArticleId/addCommentsByArticleId'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { RoutePaths } from '@/shared/config/routerConfig'
import { Button, ButtonTheme, ButtonSize } from '@/shared/ui/Button/Button'
import { Page } from '@/widgets/Page/Page'
import { getArticleRecomendations } from '../../model/slices/articleDetailsRecomendationsSlice'
import { getArticleDetailsReccomendationsIsLoading } from '../../model/selectors/recomendations'
import { articleDetailsPageReducer } from '../../model/slices'
import {
  fetchArticleRecomendations,
} from '../../model/services/fetchArticleRecomendations/fetchArticleRecomendations'

interface ArticlesDetailPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
}

const ArticlesDetailPage = (props: ArticlesDetailPageProps) => {
  const { className } = props

  const { id } = useParams<{id: string}>()

  const { t } = useTranslation('articles')

  const navigate = useNavigate()

  const onBackToList = useCallback(() => {
    navigate(RoutePaths.articles)
  }, [navigate])

  const dispatch = useAppDispatch()

  useMountEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
    dispatch(fetchArticleRecomendations())
  })

  const comments = useSelector(getArticleComments.selectAll)
  const isLoading = useSelector(getArticleDetailsIsLoading)
  const isCommentsLoading = useSelector(getArticleCommentsIsLoading)
  const recomendations = useSelector(getArticleRecomendations.selectAll)
  const isRecomendationsLoading = useSelector(getArticleDetailsReccomendationsIsLoading)

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentsByArticleId(text))
  }, [dispatch])

  if (!id) {
    return (
      <div className={classNames(cls.ArticlesDetailPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>

    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page
        className={classNames(cls.ArticlesDetailPage, {}, [className])}
        saveScroll
      >
        <Button
          theme={ButtonTheme.Clear}
          size={ButtonSize.M}
          onClick={onBackToList}
        >
          {t('Назад к списку')}
        </Button>
        <ArticleDetails id={+id} />
        {!isLoading
          && (
            <>
              <Text
                className={cls.recomedationsTitle}
                size={TextSize.M}
                title={t('Рекоммендованные статьи')}
              />
              <ArticleList
                articles={recomendations}
                isLoading={isRecomendationsLoading}
                inline
                target="_blank"
              />
              <Text
                className={cls.commentTitle}
                size={TextSize.M}
                title={t('Комментарии')}
              />
              <AddCommentForm onSendComment={onSendComment} />
              <CommentList comments={comments} isLoading={isCommentsLoading} />
            </>
          )}
      </Page>

    </DynamicModuleLoader>

  )
}

export default ArticlesDetailPage
