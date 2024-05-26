import { I18nextProvider, useTranslation } from 'react-i18next'
import i18nConfig from '@/shared/config/i18n'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import {
    getUserSettingsFromLS,
    setUserSettingsToLS,
    useIsAuthenticated,
    useSaveUserSettings,
    useUserId,
    useUserSettingsLang,
} from '@/entities/User'
import { AppLanguage } from '@/shared/types/language'

interface LanguageProviderProps {
    children?: ReactNode
}

export const LanguageProvider = (props: LanguageProviderProps) => {
    const { children } = props

    const { i18n } = useTranslation()

    const saveSetting = useSaveUserSettings()
    const isAuth = useIsAuthenticated()
    const userId = useUserId()

    const userLang = useUserSettingsLang()

    const saveLang = useCallback(
        (language: AppLanguage) => {
            if (isAuth) {
                saveSetting({ language })
            } else {
                setUserSettingsToLS({ language })
            }
        },
        [isAuth, saveSetting],
    )

    const actualLang = useMemo(() => {
        return (isAuth ? userLang : getUserSettingsFromLS()?.language) ?? 'ru'
    }, [isAuth, userLang])

    const setLang = i18n.changeLanguage
    const lang = i18n.language

    const [isLangInitiate, setLangInited] = useState(false)

    // Set parameter on start or login
    useEffect(() => {
        if (!isLangInitiate && actualLang) {
            setLang(actualLang)
            setLangInited(true)
        }
    }, [actualLang, isLangInitiate, setLang])

    useEffect(() => {
        setLangInited(false)
    }, [userId])

    // Save to settings
    useEffect(() => {
        saveLang(lang as AppLanguage)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang])

    return <I18nextProvider i18n={i18nConfig}>{children}</I18nextProvider>
}
