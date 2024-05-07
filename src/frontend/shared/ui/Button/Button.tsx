import { ButtonHTMLAttributes, FC } from 'react'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ButtonTheme {
    Clear = 'clear',
    ClearInverted = 'clearInverted',
    Outline = 'outline',
    OutlineInverted = 'outlineInverted',
    Background = 'background',
    BackgroundInverted = 'backgroundInverted',
}

export enum ButtonSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: ButtonTheme
    size?: ButtonSize
    square?: boolean
    disabled?: boolean
    responsive?: boolean
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        theme = ButtonTheme.Outline,
        size = ButtonSize.L,
        square = false,
        children,
        disabled,
        responsive,
        ...otherProps
    } = props

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.responsive]: responsive,
    }

    const additionalClasses = [className, cls[theme], cls[size]]

    return (
        <button type="button" className={classNames(cls.Button, mods, additionalClasses)} {...otherProps}>
            {children}
        </button>
    )
}
