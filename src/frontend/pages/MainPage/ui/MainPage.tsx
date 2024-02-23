// import { BugButton } from '@/app/providers/ErrorBoundary'
import { Logo } from '@/shared/ui/Logo'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/Stack'
import { MainPageLinks } from './MainPageLinks/MainPageLinks'
import cls from './MainPage.module.scss'

function MainPage() {
  return (
    <Page className={cls.MainPage}>
      <VStack
        justify="center"
        align="center"
        gap="32"
      >
        <Logo className={cls.logo} />
        <MainPageLinks className={cls.links} />
        {/* <BugButton /> */}
      </VStack>
    </Page>
  )
}

export default MainPage
