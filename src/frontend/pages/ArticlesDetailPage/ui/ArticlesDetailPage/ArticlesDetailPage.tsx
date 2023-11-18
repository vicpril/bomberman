import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesDetailPage.module.scss'
import { ArticleDetails } from '@/entities/Article'

interface ArticlesDetailPageProps {
  className?: string
}

const ArticlesDetailPage = (props: ArticlesDetailPageProps) => {
  const { className } = props

  const { t } = useTranslation()

  return (
    <div className={classNames(cls.ArticlesDetailPage, {}, [className])}>
      <ArticleDetails />
    </div>

  )
}

export default ArticlesDetailPage
