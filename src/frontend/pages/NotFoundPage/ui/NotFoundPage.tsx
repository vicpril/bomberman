import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/Text/Text'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './NotFoundPage.module.scss'

const GamePage: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={classNames(cls.NotFoundPage, {}, [])}>
      <Text
        title={t('Страница не найдена')}
      />
    </div>
  )
}

export default GamePage
