import { classNames } from '@/shared/lib/classNames/classNames'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { LanguageSwitcher } from '@/features/LanguageSwitcher'
import { HStack } from '@/shared/ui/Stack'
import { BrowserView, MobileView } from '@/shared/lib/deviceDetect'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { Drawer } from '@/shared/ui/Drawer'
import { useFlag } from '@/shared/lib/hooks/useFlag/useFlag'
import { Icon } from '@/shared/ui/Icon'
import MenuIcon from '@/shared/assets/icons/menu.svg'
import cls from './Navbar.module.scss'
import { NavbarLinks } from '../NavbarLinks/NavbarLinks'
import { NavbarUser } from '../NavbarUser/NavbarUser'

interface NavbarProps {
    className?: string
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props

    const { flag: isBurgerOpen, off: closeBurger, toggle: toggleBurger } = useFlag(false)

    return (
        <nav className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.container}>
                <HStack align="center" justify="start" className={cls.switchers}>
                    <LanguageSwitcher short />
                    <ThemeSwitcher />
                </HStack>
                <HStack align="center" justify="center" className={cls.links}>
                    <BrowserView>
                        <NavbarLinks />
                    </BrowserView>
                    <MobileView>
                        <Drawer isOpen={isBurgerOpen} onClose={closeBurger}>
                            <NavbarLinks stack="vertical" onClick={closeBurger} />
                        </Drawer>
                    </MobileView>
                </HStack>
                <HStack align="center" justify="end" gap="32" className={cls.user}>
                    <NavbarUser />
                    <MobileView>
                        <Button theme={ButtonTheme.Clear} onClick={toggleBurger} size={ButtonSize.L}>
                            <Icon Svg={MenuIcon} />
                        </Button>
                    </MobileView>
                </HStack>
            </div>
        </nav>
    )
}
