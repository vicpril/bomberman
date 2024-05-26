import { useContext } from 'react'
import { Theme, ThemeContext } from '@/shared/context/ThemeContext'

export const useTheme = () => {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = (saveAction?: (theme: Theme) => void) => {
        const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
        setTheme?.(newTheme)
        saveAction?.(newTheme)
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    }
}
