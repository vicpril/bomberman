import { classNames } from '@/shared/lib/classNames/classNames'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LanguageSwitcher } from '@/features/LanguageSwitcher'
import { HStack } from '@/shared/ui/Stack'
import cls from './Navbar.module.scss'
import { NavbarLinks } from '../NavbarLinks/NavbarLinks'
import { NavbarUser } from '../NavbarUser/NavbarUser'

interface NavbarProps {
    className?: string
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props

    return (
        <nav className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.container}>
                <HStack align="center" justify="start" className={cls.switchers}>
                    <LanguageSwitcher short />
                    <ThemeSwitcher />
                </HStack>
                <HStack align="center" justify="center" className={cls.links}>
                    <NavbarLinks />
                </HStack>
                <HStack align="center" justify="end" gap="16" className={cls.user}>
                    <NavbarUser />
                </HStack>
            </div>
        </nav>
    )
}
