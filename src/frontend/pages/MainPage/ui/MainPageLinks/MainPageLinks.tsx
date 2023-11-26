import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './MainPageLinks.module.scss'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { RoutePaths } from '@/shared/config/routerConfig'
import { getNavLinks } from '@/widgets/Navbar'

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
        to={link.path}
        size="l"
        bombed
      >
        {t(link.text)}
      </AppLink>
    ))
  ), [linksMain, t])

  return (
    <div className={classNames(cls.MainPageLinks, {}, [className])}>
      {...linkComponents}

    </div>

  )
}
