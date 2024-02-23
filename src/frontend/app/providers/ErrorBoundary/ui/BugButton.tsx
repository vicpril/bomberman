import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/Button'

// Кнопка для теста ErrorBoundary
export const BugButton = () => {
  const { t } = useTranslation()

  const [error, setError] = useState(false)

  useEffect(() => {
    if (error) throw new Error('Some error')
  }, [error])

  const onThrow = () => {
    setError(true)
  }

  return (
    <Button onClick={onThrow}>{t('throw-button')}</Button>

  )
}
