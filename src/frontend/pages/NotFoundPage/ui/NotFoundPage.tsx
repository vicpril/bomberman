import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/Text'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import cls from './NotFoundPage.module.scss'

const GamePage: FC = () => {
  const { t } = useTranslation()

  return (
    <Page className={classNames(cls.NotFoundPage, {}, [])} data-testid="NotFoundPage">
      <Text
        title={t('Страница не найдена')}
      />
    </Page>
  )
}

export default GamePage
