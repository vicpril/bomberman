import { useTranslation } from 'react-i18next'
import { AnchorHTMLAttributes, memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text'
import { Icon } from '@/shared/ui/Icon'
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import { Card } from '@/shared/ui/Card'
import { Avatar } from '@/shared/ui/Avatar'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { GetRoutePaths } from '@/shared/const/router'
import { AppLink } from '@/shared/ui/AppLink'
import cls from './ArticleListItem.module.scss'
import {
  Article, ArticleTextBlock,
} from '../../model/types/article'
import { ArticleView, ArticleBlockType } from '../../model/consts'
import { ArticleBlockTextComponent } from '../ArticleBlockTextComponent/ArticleBlockTextComponent'

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticleView;
    target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const {
    className, article, view, target,
  } = props
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onOpenArticle = useCallback(() => {
    navigate(GetRoutePaths.articlesDetail(article.id))
  }, [article.id, navigate])

  const types = <Text text={article.type.join(', ')} className={cls.types} />
  const views = (
    <>
      <Text text={String(article.views)} className={cls.views} />
      <Icon Svg={EyeIcon} />
    </>
  )

  if (view === ArticleView.BIG) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock

    return (
      <div className={classNames('ArticleListItem', {}, [className, cls[view]])}>
        <Card className="card">
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text text={article.user.username} className={cls.username} />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <Text title={article.title} className={cls.title} />
          {types}
          <img src={article.img} className={cls.img} alt={article.title} />
          {textBlock && (
            <ArticleBlockTextComponent block={textBlock} className={cls.textBlock} />
          )}
          <div className={cls.footer}>
            <Button onClick={onOpenArticle} theme={ButtonTheme.Background}>
              {t('Читать далее...')}
            </Button>
            {views}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <AppLink
      className={classNames('ArticleListItem', {}, [className, cls[view]])}
      to={GetRoutePaths.articlesDetail(article.id)}
      target={target}
    >
      <Card className="card">
        <div className={cls.imageWrapper}>
          <img alt={article.title} src={article.img} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>
        <Text text={article.title} className={cls.title} />
      </Card>
    </AppLink>
  )
})
