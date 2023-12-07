import { ReactNode } from 'react'
import { Mods, classNames } from '@/shared/lib/classNames/classNames'
import cls from './Flex.module.scss'

type FlexDirection = 'row' | 'column'
type FlexWrap = 'wrap' | 'nowrap'
type FlexJustify = 'start' | 'end' | 'center' | 'between'
type FlexAlign = 'start' | 'end' | 'center'
type FlexGap = '4' | '8' | '16' | '32'

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn,
}

const wrapClasses: Record<FlexWrap, string> = {
  wrap: cls.wrap,
  nowrap: cls.nowrap,
}

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  center: cls.justifyCenter,
  end: cls.justifyEnd,
  between: cls.justifyBetween,
}

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  center: cls.alignCenter,
  end: cls.alignEnd,
}

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  16: cls.gap16,
  32: cls.gap32,
}

export interface FlexProps {
  className?: string
  children?: ReactNode
  wrap?: FlexWrap
  direction?: FlexDirection
  justify?: FlexJustify
  align?: FlexAlign
  gap?: FlexGap,
  max?: boolean
}

const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    direction = 'row',
    align = 'center',
    justify = 'start',
    wrap,
    gap,
    max,
  } = props

  const classes = [
    className,
    directionClasses[direction],
    wrap && wrapClasses[wrap],
    justifyClasses[justify],
    alignClasses[align],
    gap && gapClasses[gap],
  ]

  const mods: Mods = {
    [cls.max]: max,
  }

  return (
    <div className={classNames(cls.Flex, mods, classes)}>
      {children}
    </div>
  )
}

export { Flex }
