import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { RoutePaths } from '@/shared/const/router'
import { getNavLinks } from '@/widgets/Navbar'
import { VStack } from '@/shared/ui/Stack'

interface MainPageLinksProps {
  className?: string
}

export const MainPageLinks = (props: MainPageLinksProps) => {
  const { className } = props

  const { t } = useTranslation()

  const links = useSelector(getNavLinks)

  const linksMain = links.filter((l) => l.path !== RoutePaths.main)

  const linkComponents = useMemo(() => (
    linksMain.map((link) => (
      <AppLink
        key={link.path}
        to={link.path}
        size="l"
        bombed
      >
        {t(link.text)}
      </AppLink>
    ))
  ), [linksMain, t])

  return (
    <VStack
      gap="32"
      justify="center"
      className={classNames('', {}, [className])}
    >
      {linkComponents}
    </VStack>

  )
}
