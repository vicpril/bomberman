import {
  ReactNode, useMemo, useState,
} from 'react'
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '@/shared/context/ThemeContext'

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.DARK

interface Props {
  children?: ReactNode
}

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState(defaultTheme)

  const defaultProps = useMemo(() => ({
    theme,
    setTheme,
  }), [theme])

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
