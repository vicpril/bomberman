import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesDetailPage.module.scss'
import { ArticleDetails } from '@/entities/Article'
import { CommentList } from '@/entities/Comment'
import {
  fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import {
  articleDetailsCommentsReducer,
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
import { Text } from '@/shared/ui/Text/Text'

interface ArticlesDetailPageProps {
  className?: string
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
}

const ArticlesDetailPage = (props: ArticlesDetailPageProps) => {
  const { className } = props

  const { id } = useParams<{id: string}>()

  const { t } = useTranslation('articles')

  const dispatch = useAppDispatch()

  useMountEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
  })

  const comments = useSelector(getArticleComments.selectAll)
  const isLoading = useSelector(getArticleDetailsIsLoading)

  if (!id) {
    return (
      <div className={classNames(cls.ArticlesDetailPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>

    )
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticlesDetailPage, {}, [className])}>
        <ArticleDetails id={+id} />
        <Text className={cls.commentTitle} title={t('Комментарии')} />
        <CommentList comments={comments} isLoading={isLoading} />
      </div>

    </DynamicModuleLoader>

  )
}

export default ArticlesDetailPage
