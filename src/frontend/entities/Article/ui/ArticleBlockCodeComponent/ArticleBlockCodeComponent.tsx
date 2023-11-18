import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleBlockCodeComponent.module.scss'

interface ArticleBlockCodeComponentProps {
  className?: string
}

const ArticleBlockCodeComponent = (props: ArticleBlockCodeComponentProps) => {
  const { className } = props

  const { t } = useTranslation()

  return (
    <div className={classNames(cls.ArticleBlockCodeComponent, {}, [className])}>
      <h1>ArticleBlockCodeComponent</h1>
    </div>

  )
}

export { ArticleBlockCodeComponent }
