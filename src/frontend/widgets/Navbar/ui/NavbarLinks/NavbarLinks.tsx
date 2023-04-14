import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './NavbarLinks.module.scss'
import { NavbarLinks as items } from '../../model/items'

interface NavbarLinksProps {
  className?: string
}

export const NavbarLinks = (props: NavbarLinksProps) => {
  const { className } = props

  const { t } = useTranslation()

  const itemsList = useMemo(() => items.map((item) => (
    <NavLink
      className={({ isActive }) => classNames(cls.link, { [cls.current]: isActive })}
      to={item.path}
      key={item.path}
    >
      {t(item.text)}
    </NavLink>
  )), [t])

  return (
    <div className={classNames(cls.NavbarLinks, {}, [className])}>
      {itemsList}
    </div>

  )
}
