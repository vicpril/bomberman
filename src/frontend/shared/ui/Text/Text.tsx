import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Text.module.scss'

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
  Right = 'right',
  Left = 'left',
  Center = 'center',
}

export enum TextSize {
    M = 'size_m',
    L = 'size_l',
}

interface TextProps {
    className?: string;
    title?: string | null;
    text?: string | null;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
}

export const Text = (props: TextProps) => {
  const {
    className,
    text,
    title,
    theme = TextTheme.PRIMARY,
    align = TextAlign.Left,
    size = TextSize.M,
  } = props

  const mods: Mods = {
    [cls[align]]: align,
    [cls[size]]: size,
  }

  return (
    <div className={classNames('Text', mods, [className, cls[theme]])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  )
}
