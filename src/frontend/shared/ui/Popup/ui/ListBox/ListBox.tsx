import { Fragment, useMemo } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { genericMemo } from '@/shared/lib/components/genericMemo/genericMemo'
import { SelectOption } from '@/shared/ui/Select'
import { DropdownDirection } from '@/shared/types/ui'
import { HStack } from '@/shared/ui/Stack'
import { Button, ButtonSize } from '@/shared/ui/Button'
import popupCls from '../../styles/popup.module.scss'
import cls from './ListBox.module.scss'
import { mapDirectionClass } from '../../consts'

type ListBoxOption<T extends string | number = string> = SelectOption<T> & {
    disabled?: boolean
}

interface ListBoxProps<T extends string | number> {
    className?: string
    label?: string
    options?: ListBoxOption<T>[]
    value?: T
    onChange: (value: T) => void
    defaultValue?: string
    readonly?: boolean
    direction?: DropdownDirection
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

    const selectedOption = useMemo(() => options?.find((o) => o.value === value), [value, options])

    return (
        <HStack gap="8" className={classNames(cls.ListBox, {}, [className])}>
            {label && <span className="label">{`${label}>`}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                className={popupCls.popup}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button className={popupCls.trigger} as="div">
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
                                    className={classNames(cls.option, {
                                        [popupCls.selected]: selected,
                                        [popupCls.active]: active,
                                        [cls.disabled]: option.disabled,
                                    })}
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
