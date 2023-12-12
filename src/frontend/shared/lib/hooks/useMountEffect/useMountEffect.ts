import { useEffect } from 'react'

export const useMountEffect = (callback: () => void) => {
  useEffect(() => {
    if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'tests') {
      callback()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
