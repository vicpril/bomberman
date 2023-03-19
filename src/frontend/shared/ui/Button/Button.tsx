import { ButtonHTMLAttributes, FC } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ButtonTheme {
  Clear = 'clear',
  ClearInverted = 'clearInverted',
  Outline = 'outline',
  Background = 'background',
  BackgroundInverted = 'backgroundInverted'
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  size?: ButtonSize
  square?: boolean
  disabled?: boolean
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    theme = ButtonTheme.Background,
    size = ButtonSize.M,
    square = false,
    children,
    disabled,
    ...otherProps
  } = props

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
  }

  const additionalClasses = [className, cls[theme], cls[size]]

  return (
    <button
      type="button"
      className={classNames(cls.Button, mods, additionalClasses)}
      {...otherProps}
    >
      {children}
    </button>

  )
}
