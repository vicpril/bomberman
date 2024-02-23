import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextAlign } from '@/shared/ui/Text'
import cls from './ArticleBlockImageComponent.module.scss'
import { ArticleImageBlock } from '../../model/types/article'

interface ArticleBlockImageComponentProps {
  className?: string
  block: ArticleImageBlock
}

const ArticleBlockImageComponent = memo((props: ArticleBlockImageComponentProps) => {
  const { className, block } = props

  return (
    <div className={classNames(cls.ArticleBlockImageComponent, {}, [className])}>
      <img src={block.src} alt={block.title} className={cls.img} />
      {block.title && (
        <Text text={block.title} align={TextAlign.Center} />
      )}
    </div>

  )
})

export { ArticleBlockImageComponent }
