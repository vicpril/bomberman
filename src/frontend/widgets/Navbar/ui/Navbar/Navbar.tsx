import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { NavbarLinks } from '../NavbarLinks/NavbarLinks'
import { LanguageSwitcher } from '@/features/LanguageSwitcher'
import { NavbarUser } from '../NavbarUser/NavbarUser'
import { HStack } from '@/shared/ui/Stack'

interface NavbarProps {
  className?: string
}

export const Navbar = (props: NavbarProps) => {
  const { className } = props

  return (
    <nav className={classNames(cls.Navbar, {}, [className])}>

      <div className={cls.container}>
        <HStack
          align="center"
          justify="start"
          className={cls.switchers}
        >
          <LanguageSwitcher short />
          <ThemeSwitcher />
        </HStack>
        <HStack
          align="center"
          justify="center"
          className={cls.links}
        >
          <NavbarLinks />
        </HStack>
        <HStack
          align="center"
          justify="end"
          gap="16"
          className={cls.user}
        >
          <NavbarUser />
        </HStack>
      </div>
    </nav>

  )
}
