import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleDetails.module.scss'

interface ArticleDetailsProps {
  className?: string
}

const ArticleDetails = (props: ArticleDetailsProps) => {
  const { className } = props

  const { t } = useTranslation()

  return (
    <div className={classNames(cls.ArticleDetails, {}, [className])}>
      <h1>ARTICLE DETAILS</h1>
    </div>

  )
}

export { ArticleDetails }
