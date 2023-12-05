import { memo, useCallback } from 'react'
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import cls from './Code.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo((props: CodeProps) => {
  const { className, text } = props

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])

  return (
    <div className={classNames(cls.Code, {}, [className])}>
      <pre className={classNames(cls.pre, {}, [className])}>
        <Button onClick={onCopy} className={cls.copyBtn} theme={ButtonTheme.Clear}>
          <CopyIcon className={cls.copyIcon} />
        </Button>
        <code>
          {text}
        </code>
      </pre>
    </div>
  )
})
