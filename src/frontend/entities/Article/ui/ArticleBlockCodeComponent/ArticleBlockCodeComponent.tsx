import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ArticleBlockCodeComponent.module.scss'
import { ArticleCodeBlock } from '../../model/types/article'
import { Code } from '@/shared/ui/Code/Code'

interface ArticleBlockCodeComponentProps {
  className?: string
  block: ArticleCodeBlock
}

const ArticleBlockCodeComponent = memo((props: ArticleBlockCodeComponentProps) => {
  const { className, block } = props

  return (
    <div className={classNames(cls.ArticleBlockCodeComponent, {}, [className])}>
      <Code text={block.code} />
    </div>

  )
})

export { ArticleBlockCodeComponent }
