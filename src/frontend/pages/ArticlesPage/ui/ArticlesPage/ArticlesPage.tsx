import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props

  const { t } = useTranslation()

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <h1>ArticlesPage</h1>
    </div>

  )
}

export default ArticlesPage