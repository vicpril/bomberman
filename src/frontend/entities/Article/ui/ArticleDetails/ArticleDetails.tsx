import { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { t } from 'i18next'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleDetails.module.scss'
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsReducer } from '../../model/slices/articleDetailsSlice'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticleDetailsById } from '../../model/services/fetchArticleDetailsById/fetchArticleDetailsById'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/getArticleDetails/getArticleDetails'
import { Text } from '@/shared/ui/Text/Text'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

interface ArticleDetailsProps {
  className?: string,
  id: number
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props

  const { t } = useTranslation('articles')

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchArticleDetailsById(id))
  }, [dispatch, id])

  const data = useSelector(getArticleDetailsData)
  const isLoading = useSelector(getArticleDetailsIsLoading)
  const error = useSelector(getArticleDetailsError)

  let content

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
    )
  } else if (error) {
    content = (
      <Text
        title={t('Произошла ошибка при загрузке')}
      />
    )
  } else {
    content = <h1>ARTICLE DETAILS</h1>
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <div className={classNames(cls.ArticleDetails, {}, [className])}>
        {content}
      </div>
    </DynamicModuleLoader>

  )
})

export { ArticleDetails }
