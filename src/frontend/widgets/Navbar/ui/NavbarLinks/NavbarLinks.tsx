import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'
import cls from './NavbarLinks.module.scss'
import { getNavLinks } from '../../model/selectors/getNavLinks/getNavLinks'
// import { isUserAuth } from '@/entities/User/model/selectors/getUserAuthData/isUserAuth'

interface NavbarLinksProps {
    className?: string
}

export const NavbarLinks = (props: NavbarLinksProps) => {
    const { className } = props

    const { t } = useTranslation()

    // const isAuth = useSelector(isUserAuth)

    // const menuItems = useMemo(() => (isAuth ? items : items.filter((i) => !i.auth)), [isAuth])
    const menuItems = useSelector(getNavLinks)

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
