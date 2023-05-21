import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'

interface LanguageSwitcherProps {
  className?: string
  short?: boolean
}

export const LanguageSwitcher = (props: LanguageSwitcherProps) => {
  const {
    className,
    short = false,
  } = props

  const { t, i18n } = useTranslation()

  const toggle = () => i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')

  return (
    <Button
      className={classNames('LanguageSwitcher', {}, [className])}
      onClick={toggle}
      theme={ButtonTheme.Background}
      size={ButtonSize.M}
    >
      {t(short ? 'Ру' : 'Язык')}
    </Button>

  )
}
