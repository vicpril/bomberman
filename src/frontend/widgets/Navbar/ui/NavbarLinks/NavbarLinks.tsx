import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './NavbarLinks.module.scss'
import { NavbarLinks as items } from '../../model/items'
import { isUserAuth } from '@/entities/User/model/selectors/getUserAuthData/isUserAuth'

interface NavbarLinksProps {
  className?: string
}

export const NavbarLinks = (props: NavbarLinksProps) => {
  const { className } = props

  const { t } = useTranslation()

  const isAuth = useSelector(isUserAuth)

  const menuItems = useMemo(() => (isAuth ? items : items.filter((i) => !i.auth)), [isAuth])

  const itemsList = useMemo(() => menuItems.map((item) => (
    <NavLink
      className={({ isActive }) => classNames(cls.link, { [cls.current]: isActive })}
      to={item.path}
      key={item.path}
    >
      {t(item.text)}
    </NavLink>
  )), [t, menuItems])

  return (
    <div className={classNames(cls.NavbarLinks, {}, [className])}>
      {itemsList}
    </div>

  )
}
