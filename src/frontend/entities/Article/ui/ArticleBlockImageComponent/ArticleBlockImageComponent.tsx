import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleBlockImageComponent.module.scss'

interface ArticleBlockImageComponentProps {
  className?: string
}

const ArticleBlockImageComponent = (props: ArticleBlockImageComponentProps) => {
  const { className } = props

  const { t } = useTranslation()

  return (
    <div className={classNames(cls.ArticleBlockImageComponent, {}, [className])}>
      <h1>ArticleBlockImageComponent</h1>
    </div>

  )
}

export { ArticleBlockImageComponent }
