import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Navbar.module.scss'
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher'
import { NavbarLinks } from '../NavbarLinks/NavbarLinks'

interface NavbarProps {
  className?: string
}

export const Navbar = (props: NavbarProps) => {
  const { className } = props

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>

      <div className={cls.container}>
        <div className={cls.logo} />
        <div className={cls.links}>
          <NavbarLinks />
        </div>
        <div className={cls.switchers}>
          <ThemeSwitcher />
        </div>
      </div>
    </div>

  )
}
