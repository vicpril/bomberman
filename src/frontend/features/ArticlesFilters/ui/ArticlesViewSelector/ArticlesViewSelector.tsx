import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import ViewBigIcon from '@/shared/assets/icons/list-24-24.svg'
import ViewSmallIcon from '@/shared/assets/icons/tiled-24-24.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import { ArticleView } from '@/entities/Article'
import cls from './ArticlesViewSelector.module.scss'

interface ArticlesViewSelectorProps {
  className?: string
  view: ArticleView
  onViewChange?: (view: ArticleView) => void
}

const articleViews = [
  {
    view: ArticleView.SMALL,
    icon: ViewSmallIcon,
  },
  {
    view: ArticleView.BIG,
    icon: ViewBigIcon,
  },
]

const ArticlesViewSelector = memo((props: ArticlesViewSelectorProps) => {
  const { className, view, onViewChange } = props

  const onClick = (newView: ArticleView) => () => {
    onViewChange?.(newView)
  }

  return (
    <div className={classNames('ArticlesViewSelector', {}, [className])}>
      {
        articleViews.map((viewType) => (
          <Button
            key={viewType.view}
            theme={ButtonTheme.Clear}
            onClick={onClick(viewType.view)}
          >
            <Icon
              Svg={viewType.icon}
              className={classNames('', { [cls.selected]: viewType.view === view })}
            />
          </Button>
        ))
      }
    </div>

  )
})

export { ArticlesViewSelector }
