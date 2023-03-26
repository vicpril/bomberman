import React, {
  useEffect, useMemo, useRef, useState,
} from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { findFirstDiffPos } from '@/shared/lib/stringsDifference/getIndexOfDifferenceStrings'
import { useFlag } from '@/shared/lib/hooks/useFlag/useFlag'
import { useMountEffect } from '@/shared/lib/hooks/useMountEffect/useMountEffect'
import cls from './Input.module.scss'
import { getSymbolWidth, getSymbolsLength } from './config'

type CustomInputAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends CustomInputAttributes {
  className?: string
  value?: string
  onChange?: (value: string) => void
  autofocus?: boolean
}

export const Input = (props: InputProps) => {
  const {
    className, placeholder, onChange, value, autofocus, ...otherProps
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')

  useMountEffect(() => setInputValue(value || ''))

  useEffect(() => {
    onChange?.(inputValue)
  }, [inputValue, onChange])

  const { flag: isFocused, on: onFocus, off: onBlur } = useFlag(false)

  useEffect(() => {
    if (autofocus) {
      onFocus()
      inputRef.current?.focus()
    }
  }, [autofocus, onFocus])

  const [caretPosition, setCaretPosition] = useState(value?.length || 0)

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const diffIndex = findFirstDiffPos(inputValue, e.target.value)
    setCaretPosition(diffIndex === -1 ? e.target.value.length : diffIndex)
    setInputValue(e.target.value)
  }

  const onSelect = (e: any) => {
    setCaretPosition(e?.target?.selectionStart || 0)
  }

  const caretLeft = useMemo(
    () => getSymbolsLength(inputValue.slice(0, caretPosition)),
    [inputValue, caretPosition],
  )

  const caretWidth = useMemo(
    () => getSymbolWidth(inputValue[caretPosition]),
    [caretPosition, inputValue],
  )

  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
      <div className={cls.placeholder}>{placeholder ? `${placeholder}>` : ''}</div>
      <div className={cls.caretWrapper}>
        <input
          ref={inputRef}
          className={cls.input}
          type="text"
          value={value}
          onChange={onChangeHandler}
          onFocus={onFocus}
          onBlur={onBlur}
          onSelect={onSelect}
          {...otherProps}
        />
        {isFocused && (
          <span className={cls.caret} style={{ left: `${caretLeft}px`, width: `${caretWidth}px` }} />
        )}

      </div>

    </div>

  )
}
