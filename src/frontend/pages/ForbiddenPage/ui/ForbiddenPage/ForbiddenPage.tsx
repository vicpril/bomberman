import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './ForbiddenPage.module.scss'
import { Text } from '@/shared/ui/Text'
import { Page } from '@/widgets/Page'

interface ForbiddenPageProps {
    className?: string;
}

const ForbiddenPage = memo((props: ForbiddenPageProps) => {
  const { className } = props
  const { t } = useTranslation()

  return (
    <Page className={classNames(cls.ForbiddenPage, {}, [className])}>
      <Text title={t('Доступ к странице запрещен')} />
    </Page>
  )
})

export default ForbiddenPage
