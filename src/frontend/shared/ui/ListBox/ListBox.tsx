import { Fragment, useMemo } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ListBox.module.scss'
import { genericMemo } from '@/shared/lib/components/genericMemo/genericMemo'
import { SelectOption } from '@/shared/ui/Select/Select'
import { HStack } from '../Stack'
import { Button, ButtonSize } from '../Button/Button'
import { DropdownDirection } from '@/shared/types/ui'

type ListBoxOption<T extends string | number = string> = SelectOption<T> & {
  disabled?: boolean
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.optionsBottomLeft,
  'bottom right': cls.optionsBottomRight,
  'top left': cls.optionsTopLeft,
  'top right': cls.optionsTopRight,
}

interface ListBoxProps<T extends string | number> {
  className?: string
  label?: string
  options?: ListBoxOption<T>[]
  value?: T
  onChange: (value: T) => void
  defaultValue?: string
  readonly?: boolean
  direction?: DropdownDirection;
}

const ListBoxComponent = <T extends string | number = string>(props: ListBoxProps<T>) => {
  const {
    className,
    label,
    options,
    value,
    onChange,
    defaultValue,
    readonly,
    direction = 'bottom left',
  } = props

  const optionsClasses = [mapDirectionClass[direction]]

  const selectedOption = useMemo(
    () => options?.find((o) => o.value === value),
    [value, options],
  )

  return (
    <HStack
      gap="8"
      className={classNames(cls.ListBox, {}, [className])}
    >
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={cls.container}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button className={cls.trigger}>
          <Button disabled={readonly} size={ButtonSize.S}>
            {value ? selectedOption?.label : defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
          {options?.map((option) => (
            <HListBox.Option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(
                    cls.option,
                    {
                      [cls.selected]: selected,
                      [cls.active]: active,
                      [cls.disabled]: option.disabled,
                    },
                  )}
                >
                  {option.label}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  )
}

export const ListBox = genericMemo(ListBoxComponent)
