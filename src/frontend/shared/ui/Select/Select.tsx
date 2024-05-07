import React, { ChangeEvent, useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { genericMemo } from '@/shared/lib/components/genericMemo/genericMemo'
import cls from './Select.module.scss'

type CustomSelectAttributes = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'>

export type SelectOption<T extends string | number = string> = {
    value: T
    label: string
}

interface SelectProps<T extends string | number = string> extends CustomSelectAttributes {
    className?: string
    value?: T
    options: SelectOption<T>[]
    onChange?: (value: T) => void
    label?: string
    readonly?: boolean
    denyResponsive?: boolean
}

const Component = <T extends string | number = string>(props: SelectProps<T>) => {
    const { options, className, label, onChange, value, readonly, denyResponsive } = props

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value as T)
        }
    }

    const optionsList = useMemo(
        () =>
            options.map(({ label, value }) => (
                <option value={value} key={value}>
                    {label}
                </option>
            )),
        [options],
    )

    return (
        <div className={classNames(cls.SelectWrapper, { [cls._responsive]: !denyResponsive }, [className])}>
            {label && <div className={cls.label}>{label ? `${label}>` : ''}</div>}
            <select className={cls.select} value={value} onChange={onChangeHandler} disabled={readonly}>
                {optionsList}
            </select>
        </div>
    )
}

export const Select = genericMemo(Component)
