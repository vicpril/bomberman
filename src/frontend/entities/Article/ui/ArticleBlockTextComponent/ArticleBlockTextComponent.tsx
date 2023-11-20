import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleBlockTextComponent.module.scss'
import { ArticleTextBlock } from '../../model/types/article'
import { Text } from '@/shared/ui/Text/Text'

interface ArticleBlockTextComponentProps {
  className?: string
  block: ArticleTextBlock
}

const ArticleBlockTextComponent = memo((props: ArticleBlockTextComponentProps) => {
  const { className, block } = props

  return (
    <div className={classNames(cls.ArticleBlockTextComponent, {}, [className])}>
      {block.title && (
        <Text title={block.title} className={cls.title} />
      )}
      {block.paragraphs.map((paragraph, _index) => (
        <Text key={paragraph} text={paragraph} className={cls.paragraph} />
      ))}
    </div>

  )
})

export { ArticleBlockTextComponent }
