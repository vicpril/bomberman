import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import { getNavbarLinks } from '@/features/Navigation'
import cls from './NavbarLinks.module.scss'

interface NavbarLinksProps {
    className?: string
}

export const NavbarLinks = (props: NavbarLinksProps) => {
    const { className } = props

    const { t } = useTranslation()

    const menuItems = useSelector(getNavbarLinks)

    const itemsList = useMemo(
        () =>
            menuItems.map((item) => (
                <NavLink
                    className={({ isActive }) => classNames(cls.link, { [cls.current]: isActive })}
                    to={item.path}
                    key={item.path}
                >
                    {t(item.text)}
                </NavLink>
            )),
        [t, menuItems],
    )

    return (
        <HStack
            gap="16"
            align="center"
            max
            role="navigation"
            className={classNames('NavbarLinks', {}, [className])}
        >
            {itemsList}
        </HStack>
    )
}
