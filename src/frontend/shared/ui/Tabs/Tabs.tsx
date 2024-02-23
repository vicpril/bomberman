import { classNames } from '@/shared/lib/classNames/classNames'
import { genericMemo } from '@/shared/lib/components/genericMemo/genericMemo'
import cls from './Tabs.module.scss'
import { SelectOption } from '../Select/Select'
import { Button, ButtonSize, ButtonTheme } from '../Button/Button'

interface TabsProps<T extends string | number = string> {
  className?: string
  options: SelectOption<T>[]
  value: T
  onChange?: (value: T) => void
}

const Component = <T extends string | number = string>(props: TabsProps<T>) => {
  const {
    className, options, value, onChange,
  } = props

  const onTabClick = (tabValue: T) => () => {
    onChange?.(tabValue)
  }

  const renderOptions = (option: SelectOption<T>) => (
    <Button
      key={option.value}
      theme={option.value === value ? ButtonTheme.BackgroundInverted : ButtonTheme.Outline}
      size={ButtonSize.M}
      onClick={onTabClick(option.value)}
    >
      {option.label}
    </Button>
  )

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {
        options.map(renderOptions)
      }
    </div>

  )
}

export const Tabs = genericMemo(Component)
