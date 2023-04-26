import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './MainPageLinks.module.scss'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { RoutePaths } from '@/shared/config/routerConfig'

interface MainPageLinksProps {
  className?: string
}

export const MainPageLinks = (props: MainPageLinksProps) => {
  const { className } = props

  const { t } = useTranslation()

  return (
    <div className={classNames(cls.MainPageLinks, {}, [className])}>
      <AppLink
        to={RoutePaths.game}
        size="l"
        bombed
      >
        {t('Играть')}
      </AppLink>
      <AppLink
        to={RoutePaths.profile}
        size="m"
        bombed
      >
        {t('Профиль')}
      </AppLink>

    </div>

  )
}
