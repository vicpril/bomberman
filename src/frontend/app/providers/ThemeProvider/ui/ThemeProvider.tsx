import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { Theme, ThemeContext } from '@/shared/context/ThemeContext'
import {
    getUserSettingsFromLS,
    setUserSettingsToLS,
    useIsAuthenticated,
    useSaveUserSettings,
    useUserId,
    useUserSettingsTheme,
} from '@/entities/User'

interface Props {
    initialTheme?: Theme
    children?: ReactNode
}

const ThemeProvider = ({ children, initialTheme }: Props) => {
    const saveSetting = useSaveUserSettings()
    const isAuth = useIsAuthenticated()
    const userId = useUserId()

    const userTheme = useUserSettingsTheme()

    const saveTheme = useCallback(
        (theme: Theme) => {
            if (isAuth) {
                saveSetting({ theme })
            } else {
                setUserSettingsToLS({ theme })
            }
        },
        [isAuth, saveSetting],
    )

    const actualTheme = useMemo(() => {
        return (isAuth ? userTheme : getUserSettingsFromLS()?.theme) ?? Theme.DARK
    }, [isAuth, userTheme])

    const [theme, setTheme] = useState(initialTheme || actualTheme)

    const [isThemeInitiate, setThemeInited] = useState(false)

    // Set parameter on start or login
    useEffect(() => {
        if (!isThemeInitiate && actualTheme) {
            setTheme(actualTheme)
            setThemeInited(true)
        }
    }, [actualTheme, isThemeInitiate])

    useEffect(() => {
        setThemeInited(false)
    }, [userId])

    // Save to settings
    useEffect(() => {
        saveTheme(theme)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme])

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme],
    )

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
