import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export const useErrorMessages = () => {
    const { i18n } = useTranslation('errors')

    const { language } = i18n

    const getErrorMessage = useCallback(
        (code: string): string => {
            const translation = i18n.getResource(language, 'errors', code)
            if (!translation) console.log(`🚀 ~ No translation in ${'errors'}:`, code)
            return translation || code
        },
        [i18n, language],
    )

    return { getErrorMessage }
}
