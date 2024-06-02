import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack, VStack } from '@/shared/ui/Stack'
import { getNavbarLinks } from '@/features/Navigation'
import { FlexProps } from '@/shared/ui/Stack/Flex/Flex'
import cls from './NavbarLinks.module.scss'

interface NavbarLinksProps {
    className?: string
    onClick?: () => void
    stack?: 'vertical' | 'horizontal'
}

export const NavbarLinks = (props: NavbarLinksProps) => {
    const { className, stack = 'horizontal', onClick } = props

    const { t } = useTranslation()

    const menuItems = useSelector(getNavbarLinks)

    const itemsList = useMemo(
        () =>
            menuItems.map((item) => (
                <NavLink
                    className={({ isActive }) => classNames(cls.link, { [cls.current]: isActive })}
                    to={item.path}
                    key={item.path}
                    onClick={onClick}
                >
                    {t(item.text)}
                </NavLink>
            )),
        [t, menuItems, onClick],
    )

    const stackProps: FlexProps = {
        gap: '16',
        align: 'center',
        max: true,
        role: 'navigation',
        className: classNames('NavbarLinks', {}, [className]),
    }

    return stack === 'horizontal' ? (
        <HStack {...stackProps}>{itemsList}</HStack>
    ) : (
        <VStack {...stackProps} gap="32">
            {itemsList}
        </VStack>
    )
}
