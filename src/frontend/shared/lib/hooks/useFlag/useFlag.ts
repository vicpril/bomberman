import {
  useCallback, useMemo, useState,
} from 'react'

export const useFlag = (initialValue: boolean, cssClassName = '') => {
  const [flag, setFlag] = useState(initialValue)

  const css = useMemo(() => (flag ? cssClassName : ''), [cssClassName, flag])

  const on = useCallback(() => {
    setFlag(true)
  }, [])

  const off = useCallback(() => {
    setFlag(false)
  }, [])

  const toggle = useCallback(() => {
    if (flag) off()
    else on()
  }, [flag, off, on])

  return {
    flag,
    on,
    off,
    toggle,
    css,
  }
}
