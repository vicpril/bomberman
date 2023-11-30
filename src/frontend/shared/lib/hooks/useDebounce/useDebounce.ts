import { MutableRefObject, useCallback, useRef } from 'react'

export const useDebounce = <P>(callback: (...args: P[]) => void, delay: number) => {
  const timer = useRef() as MutableRefObject<any>

  return useCallback((...args: P[]) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }, [callback, delay])
}
