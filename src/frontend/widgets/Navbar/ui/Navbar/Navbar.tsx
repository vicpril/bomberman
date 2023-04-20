import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher'
import { NavbarLinks } from '../NavbarLinks/NavbarLinks'
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher'
import { NavbarUser } from '../NavbarUser/NavbarUser'

interface NavbarProps {
  className?: string
}

export const Navbar = (props: NavbarProps) => {
  const { className } = props

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>

      <div className={cls.container}>
        <div className={cls.switchers}>
          <LanguageSwitcher short />
          <ThemeSwitcher />
        </div>
        <div className={cls.links}>
          <NavbarLinks />
        </div>
        <div className={cls.user}>
          <NavbarUser />
        </div>
      </div>
    </div>

  )
}
