import { BugButton } from '@/app/providers/ErrorBoundary'
import cls from './MainPage.module.scss'
import { Logo } from '@/shared/ui/Logo/Logo'
import { MainPageLinks } from './MainPageLinks/MainPageLinks'
import { Page } from '@/shared/ui/Page/Page'

function MainPage() {
  return (
    <Page className={cls.MainPage}>
      <Logo className={cls.logo} />
      <MainPageLinks />
      <BugButton />
    </Page>
  )
}

export default MainPage
