import { BugButton } from '@/app/providers/ErrorBoundary'
import cls from './MainPage.module.scss'
import { Logo } from '@/shared/ui/Logo/Logo'
import { MainPageLinks } from './MainPageLinks/MainPageLinks'

function MainPage() {
  return (
    <div className={cls.MainPage}>
      <Logo className={cls.logo} />
      <MainPageLinks />
      <BugButton />
    </div>
  )
}

export default MainPage
