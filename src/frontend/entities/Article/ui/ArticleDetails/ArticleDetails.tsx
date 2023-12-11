import { memo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
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
import { Text, TextAlign, TextSize } from '@/shared/ui/Text/Text'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { ArticleBlockCodeComponent } from '../ArticleBlockCodeComponent/ArticleBlockCodeComponent'
import { ArticleBlockTextComponent } from '../ArticleBlockTextComponent/ArticleBlockTextComponent'
import { ArticleBlock, ArticleBlockType } from '../../model/types/article'
import { ArticleBlockImageComponent } from '../ArticleBlockImageComponent/ArticleBlockImageComponent'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Icon } from '@/shared/ui/Icon/Icon'
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg'
import { HStack, VStack } from '@/shared/ui/Stack'

interface ArticleDetailsProps {
  className?: string,
  id: string
}

const reducers: ReducersList = {
  articleDetails: articleDetailsReducer,
}

const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { className, id } = props

  const { t } = useTranslation('articles')

  const dispatch = useAppDispatch()

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleBlockCodeComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        )
      case ArticleBlockType.IMAGE:
        return (
          <ArticleBlockImageComponent
            key={block.id}
            block={block}
            className={cls.block}
          />
        )
      case ArticleBlockType.TEXT:
        return (
          <ArticleBlockTextComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        )
      default:
        return null
    }
  }, [])

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleDetailsById(+id))
    }
  }, [dispatch, id])

  const article = useSelector(getArticleDetailsData)
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
    content = (
      <VStack max gap="8" align="start">
        <HStack justify="center" max>
          <Avatar
            size={200}
            src={article?.img}
            className={cls.avatar}
          />
        </HStack>
        <Text
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          align={TextAlign.Left}
          size={TextSize.L}
        />
        <HStack align="center">
          <Icon className={cls.icon} Svg={EyeIcon} />
          <Text text={String(article?.views)} />
        </HStack>
        <HStack align="center">
          <Icon className={cls.icon} Svg={CalendarIcon} />
          <Text text={article?.createdAt} />
        </HStack>
        {article?.blocks.map(renderBlock)}
      </VStack>
    )
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
