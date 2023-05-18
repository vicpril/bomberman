import React, {
  ChangeEvent, useMemo,
} from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Select.module.scss'

type CustomSelectAttributes = Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'>

export type SelectOption = {
  value: string | number,
  label: string
}

interface SelectProps extends CustomSelectAttributes {
  className?: string
  value?: string | number
  options: SelectOption[]
  onChange?: (value: string) => void
  label?: string
  readonly?: boolean
}

export const Select = (props: SelectProps) => {
  const {
    options, className, label, onChange, value, readonly,
  } = props

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value)
    }
  }

  const optionsList = useMemo(() => options.map(({ label, value }) => (
    <option value={value} key={value}>{label}</option>
  )), [options])

  return (
    <div className={classNames(cls.SelectWrapper, {}, [className])}>
      <div className={cls.label}>{label ? `${label}>` : ''}</div>
      <select
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionsList}
      </select>
    </div>
  )
}
