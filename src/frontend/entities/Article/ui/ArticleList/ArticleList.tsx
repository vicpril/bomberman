import { AnchorHTMLAttributes, memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import cls from './ArticleList.module.scss'
import { Article } from '../../model/types/article'
import { ArticleView } from '../../model/consts'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view?: ArticleView
    inline?: boolean
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((_, index) => <ArticleListItemSkeleton className={cls.card} key={index} view={view} />)

export const ArticleList = memo((props: ArticleListProps) => {
    const { className, articles, isLoading, view = ArticleView.SMALL, inline = false, target } = props

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            view={view}
            className={cls.card}
            key={article.id}
            target={target}
        />
    )

    return (
        <div
            className={classNames('ArticleList', { [cls._inline]: inline }, [className, cls[view]])}
            data-testid="ArticleList"
        >
            {articles.length > 0 ? articles.map(renderArticle) : null}
            {isLoading && getSkeletons(view)}
        </div>
    )
})
