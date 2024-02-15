import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AdminPanelPage.module.scss'
import { Text } from '@/shared/ui/Text/Text'
import { Page } from '@/widgets/Page'

interface AdminPanelPageProps {
  className?: string
}

const AdminPanelPage = (props: AdminPanelPageProps) => {
  const { className } = props

  const { t } = useTranslation()

  return (
    <Page className={classNames(cls.AdminPanelPage, {}, [className])}>
      <Text title={t('Административная панель')} />
    </Page>

  )
}

export default AdminPanelPage
