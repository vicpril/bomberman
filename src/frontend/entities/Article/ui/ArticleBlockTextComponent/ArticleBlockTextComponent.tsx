import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleBlockTextComponent.module.scss'

interface ArticleBlockTextComponentProps {
  className?: string
}

const ArticleBlockTextComponent = (props: ArticleBlockTextComponentProps) => {
  const { className } = props

  const { t } = useTranslation()

  return (
    <div className={classNames(cls.ArticleBlockTextComponent, {}, [className])}>
      <h1>ArticleBlockTextComponent</h1>
    </div>

  )
}

export { ArticleBlockTextComponent }
