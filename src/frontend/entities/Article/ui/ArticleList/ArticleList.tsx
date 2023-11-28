import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import cls from './ArticleList.module.scss'
import { Article, ArticleView } from '../../model/types/article'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

interface ArticleListProps {
    className?: string;
    articles: Article[]
    isLoading?: boolean;
    view?: ArticleView;
}

const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.SMALL ? 9 : 3)
  .fill(0)
  .map((_, index) => (
    <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
  ))

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    view = ArticleView.SMALL,
    isLoading,
  } = props

  const renderArticle = (article: Article) => (
    <ArticleListItem
      article={article}
      view={view}
      className={cls.card}
      key={article.id}
    />
  )

  return (
    <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
      {articles.length > 0
        ? articles.map(renderArticle)
        : null}
      {isLoading && getSkeletons(view)}
    </div>
  )
})