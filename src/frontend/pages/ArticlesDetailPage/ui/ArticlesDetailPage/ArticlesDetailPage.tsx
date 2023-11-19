import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesDetailPage.module.scss'
import { ArticleDetails } from '@/entities/Article'

interface ArticlesDetailPageProps {
  className?: string
}

const ArticlesDetailPage = (props: ArticlesDetailPageProps) => {
  const { className } = props

  const { id } = useParams<{id: string}>()

  const { t } = useTranslation('articles')

  if (!id) {
    return (
      <div className={classNames(cls.ArticlesDetailPage, {}, [className])}>
        {t('Статья не найдена')}
      </div>

    )
  }

  return (
    <div className={classNames(cls.ArticlesDetailPage, {}, [className])}>
      <ArticleDetails id={+id} />
    </div>

  )
}

export default ArticlesDetailPage
