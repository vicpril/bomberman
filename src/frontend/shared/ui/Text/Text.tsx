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
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

type TextHeaderTag = 'h1' | 'h2' | 'h3'

const mapSizeHeaderTags: Record<TextSize, TextHeaderTag> = {
    size_l: 'h1',
    size_m: 'h2',
    size_s: 'h3',
}

interface TextProps {
    className?: string
    title?: string | null
    text?: string | null
    theme?: TextTheme
    align?: TextAlign
    size?: TextSize

    'data-testid'?: string
}

export const Text = (props: TextProps) => {
    const {
        className,
        text,
        title,
        theme = TextTheme.PRIMARY,
        align = TextAlign.Left,
        size = TextSize.M,
        'data-testid': dataTestId = 'Text',
    } = props

    const HeaderTag = mapSizeHeaderTags[size]

    const mods: Mods = {
        [cls[align]]: align,
        [cls[size]]: size,
    }

    return (
        <div className={classNames('Text', mods, [className, cls[theme]])}>
            {title && (
                <HeaderTag className={cls.title} data-testid={`${dataTestId}.Title`}>
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
                    {text}
                </p>
            )}
        </div>
    )
}
