/* eslint-disable i18next/no-literal-string */
import { classNames } from '@/shared/lib/classNames/classNames'
import logoImage from '@/shared/assets/icons/logo_img_base.png'
import cls from './Logo.module.scss'

interface LogoProps {
  className?: string
}

export const Logo = (props: LogoProps) => {
  const { className } = props

  return (
    <div className={classNames(cls.Logo, {}, [className])}>
      <span className={classNames('', {}, [cls.text, cls.textBig])}>
        B
        <img className={cls.image} src={logoImage} alt="logo" />
        MB
      </span>
      <span className={classNames('', {}, [cls.text, cls.textSmall])}>ATTACK</span>
    </div>

  )
}
