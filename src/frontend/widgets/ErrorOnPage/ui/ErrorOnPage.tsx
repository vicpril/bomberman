import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button'
import { Text, TextTheme } from '@/shared/ui/Text'
import cls from './ErrorOnPage.module.scss'

interface ErrorOnPageProps {
  className?: string
}

export const ErrorOnPage = (props: ErrorOnPageProps) => {
  const { className } = props

  const { t } = useTranslation()

  const reload = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

  return (
    <div className={classNames(cls.ErrorOnPage, {}, [className])}>
      {/* <h1>{t('error-heppened')}</h1> */}
      <Text
        className={cls.text}
        title={t('error-heppened')}
        theme={TextTheme.ERROR}
      />
      <Button onClick={reload}>{t('perezagruzit-stranicu')}</Button>
    </div>

  )
}
