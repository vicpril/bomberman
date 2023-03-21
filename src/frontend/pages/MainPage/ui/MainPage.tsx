import { useTranslation } from 'react-i18next'
import { BugButton } from '@/app/providers/ErrorBoundary'

function MainPage() {
  const { t } = useTranslation('main')
  return (
    <h1>
      <BugButton />
      {t('Главная страница')}
    </h1>
  )
}

export default MainPage
