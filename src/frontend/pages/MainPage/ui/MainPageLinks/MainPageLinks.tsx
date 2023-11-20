import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './MainPageLinks.module.scss'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { RoutePaths } from '@/shared/config/routerConfig'
import { isUserAuth } from '@/entities/User/model/selectors/getUserAuthData/isUserAuth'
import { navbarLinks } from '@/widgets/Navbar'

interface MainPageLinksProps {
  className?: string
}

export const MainPageLinks = (props: MainPageLinksProps) => {
  const { className } = props

  const { t } = useTranslation()

  const isAuth = useSelector(isUserAuth)

  const links = useMemo(() => (
    !isAuth
      ? navbarLinks.filter((l) => l.path !== RoutePaths.main).filter((l) => !l.auth)
      : navbarLinks.filter((l) => l.path !== RoutePaths.main)), [isAuth])

  const linkComponents = useMemo(() => (
    links.map((link) => (
      <AppLink
        to={link.path}
        size="l"
        bombed
      >
        {t(link.text)}
      </AppLink>
    ))
  ), [links, t])

  return (
    <div className={classNames(cls.MainPageLinks, {}, [className])}>
      {...linkComponents}

    </div>

  )
}
