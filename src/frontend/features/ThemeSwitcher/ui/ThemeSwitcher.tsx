import DarkIcon from '@/shared/assets/icons/theme-dark.svg'
import LightIcon from '@/shared/assets/icons/theme-light.svg'
import { Theme } from '@/shared/context/ThemeContext'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useCallback } from 'react'
import { Icon } from '@/shared/ui/Icon'

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
    const { className } = props
    const { theme, toggleTheme } = useTheme()

    const toggleThemeHandler = useCallback(() => {
        toggleTheme()
    }, [toggleTheme])

    return (
        <Button
            className={classNames('ThemeSwitcher', {}, [className])}
            onClick={toggleThemeHandler}
            theme={ButtonTheme.Clear}
        >
            <Icon Svg={theme === Theme.DARK ? DarkIcon : LightIcon} width={32} height={32} />
        </Button>
    )
}
