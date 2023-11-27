import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'
import { ArticleList, ArticleView } from '@/entities/Article'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props

  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <ArticleList
        className={cls.list}
        isLoading
        view={ArticleView.BIG}
        articles={[]}
      />
    </div>

  )
}

export default ArticlesPage
