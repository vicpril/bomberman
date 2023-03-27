import { useTranslation } from 'react-i18next'
import { BugButton } from '@/app/providers/ErrorBoundary'
import cls from './MainPage.module.scss'
import { Logo } from '@/shared/ui/Logo/Logo'

function MainPage() {
  const { t } = useTranslation('main')
  return (
    <div className={cls.MainPage}>
      <Logo className={cls.logo} />
      <BugButton />
    </div>
  )
}

export default MainPage
